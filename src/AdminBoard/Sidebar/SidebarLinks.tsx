import React, { Fragment, useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Scrollbar from "../common/Scrollbar";
import SiderBarLoadingSkeleton from "./LoadingSkeleton";
import IMenuItem from "Base/Model/IMenuItem";
import { Divider } from "@material-ui/core";
import { RXNode } from "Base/RXNode/RXNode";
import Subheader from "./MenuItems/Subheader";
import { MenuNode } from "./MenuItems/MenuNode";
import { MenuNodeGroup } from "./MenuItems/MenuNodeGroup";
import { RXNodeRoot } from "Base/RXNode/Root";
import { useQuery } from '@apollo/react-hooks';
import { useLoggedUser } from "store1/helpers1/useLoggedUser";
import { cloneObject } from "utils/cloneObject";
import {observer} from "mobx-react-lite";
import { ID } from "Base/Model/graphqlTypes";
import { GET_DRAWER } from "../../Base/GraphQL/GQLs";
import { useShowAppoloError } from "store1/helpers1/useInfoError";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);

export const SidebarLinks = observer((
  props : {
    fullWidth?:number,
    mini:boolean,
  }
)=>{
  const classes = useStyles();
  const [openedId, setOpenedId] = React.useState('');
  const { loading, error, data } = useQuery(GET_DRAWER/*, {fetchPolicy:'no-cache'}*/);
  const [items,setItems] = React.useState<Array<RXNode<IMenuItem>>>([]);
  const loggedUser = useLoggedUser();

  const handleOpened = (id:ID)=>{
    setOpenedId(id)
  }

  useShowAppoloError(error)

  useEffect(()=>{
    let root = new RXNodeRoot<IMenuItem>();
    root.parse(cloneObject(data?.drawer?.items||[]));
    data && setItems(root.children);          
  },[data]);

  const listItems =items?.map((node:RXNode<IMenuItem>)=>{
    let item = node.meta;
    const authed = loggedUser.authCheck(...node.meta?.auths||[]);
    return (
    <Fragment key={node.id}>
      {
        item.type === 'subheader' && authed && <Subheader mini = {props.mini} node={node} />
      }
      {item.type === 'item' && authed && <MenuNode mini = {props.mini} node={node}/>}
      {item.type === 'group' && authed && <MenuNodeGroup mini = {props.mini} node={node} onOpened={handleOpened} openedId={openedId}/>}
      {item.type === 'divider' && authed && <Divider />}
    </Fragment>
    )
  })

  return (
    <Scrollbar>
      <List
        component="nav"
        className={classes.root}
        style={{
          width: (props.fullWidth) + 'px',
        }}
      >
        {loading?
          <SiderBarLoadingSkeleton/>
          :
          listItems
        }

      </List>
    </Scrollbar>
  );
})