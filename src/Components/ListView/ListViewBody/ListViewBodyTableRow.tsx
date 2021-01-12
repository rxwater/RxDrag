import { TableRow, TableCell, Checkbox} from "@material-ui/core";
import React from "react";
import { useListViewStore } from "../ListViewStore";
import { ModelProvider } from "Base/ModelTree/ModelProvider";
import { ModelStore } from "Base/ModelTree/ModelStore";
import {observer} from "mobx-react";

export interface DataRow{
  id:any,
  [key:string]:any,
}

const RowCheckBox = observer((props:{rowId:string}) => {
  const {rowId} = props;
  const listViewStore = useListViewStore();
  const isItemSelected = listViewStore.isRowSelected(rowId);
  const labelId = `listview-${rowId}`;
  const handleClick = ()=>{
    listViewStore.toggleSelect(rowId);
  }
  return (
    <Checkbox
      checked={isItemSelected}
      inputProps={{ 'aria-labelledby': labelId }}
      onClick = {handleClick}
    />
  )
})

export const ListViewBodyTableRow = (
  props: {
    row:DataRow,
    children?:any,
  }
)=>{
  const {row, children} = props;

  return (
    <TableRow
      hover
      id={row.id}
      role="checkbox"
      tabIndex={-1}
      key={row.id}
   
    >
      <TableCell padding="checkbox">
        {
          <RowCheckBox
            rowId={row.id}
          />
        }
      </TableCell>
      <ModelProvider value={new ModelStore(row)}>
        {
          children
        }
      </ModelProvider>
    </TableRow>

  );
}