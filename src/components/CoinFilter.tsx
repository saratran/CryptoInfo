import {
  Autocomplete,
  autocompleteClasses,
  Button,
  Paper,
  Popper,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useState } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import "./styles/NavBar.css";

const useStyles = makeStyles({
  root: {
    padding: 20,
  },
  autoComplete: {
    maxWidth: 800,
  },
  applyButton: {
    marginTop: 20,
  },
});

interface CoinFilterProp {
  coins: CoinSimple[];
  isLoadingCoins: boolean;
  handleFilterApply: (coins: Array<string>) => void;
}

const CoinFilter: FC<CoinFilterProp> = ({
  coins,
  isLoadingCoins,
  handleFilterApply,
}) => {
  const classes = useStyles();
  const [coinFilters, setCoinFilters] = useState<Array<string>>([]);
  return (
    <Paper className={classes.root}>
      <Autocomplete
        className={classes.autoComplete}
        multiple
        id="tags-standard"
        options={coins}
        filterSelectedOptions
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(event: any, newValue) => {
          if (newValue) setCoinFilters(newValue.map((value) => value.id));
        }}
        loading={isLoadingCoins}
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        renderOption={(props, option) => [props, option]}
        renderGroup={(params) => params}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Coin names"
            placeholder="e.g. bitcoin"
          />
        )}
      />
      <Button
        className={classes.applyButton}
        variant="contained"
        color="primary"
        onClick={() => handleFilterApply(coinFilters)}
      >
        Apply
      </Button>
    </Paper>
  );
};

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1].name}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactChild[] = [];
  (children as React.ReactChild[]).forEach(
    (item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactChild) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export default CoinFilter;
