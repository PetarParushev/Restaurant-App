import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Category } from "../../../models/category";
import { createOrder,addProductsToOrder, getOrderState } from "../../../store/slices/orderSlice";
import { getTablesState } from "../../../store/slices/tableSlice";
import { RootState } from "../../../store/store"
import './TableOrder.css';

type BackState = {
    id:number,
    name:string
}
const useStyles = makeStyles({
    root: {
      margin: 'auto',
      marginTop: 30,
    },
    pos: {
      marginBottom: 30,
    },
    cardPosition: {
      position: 'relative',
      color: '#2699fb',
    },
    buttonPosition: {
      position: 'absolute',
      right: 15,
      bottom: 25,
      borderRadius: 50,
      backgroundColor: '#2699fb',
      padding: 5,
    },
    bold: {
      fontWeight: 'bold',
    }
  });

  type orderProductItem = {
      productId:number,
      name:string,
      quantity:number,
      price:number
  }

const TableOrder:React.FC = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {categories} = useSelector((state: RootState) => state.categoriesState)
    const [backState,setBackState] = useState<BackState[]>([]);
    const [currentCategory,setCurrentCategory] = useState<Category>()
    const { id } = useParams<{ id: string }>();
    const [orderProducts,setOrderProducts] = useState<orderProductItem[]>([])
    const table = useSelector((state: RootState) => state.tables.rows.find(o => o.id === +id))
    console.log(table);
    useEffect(() => {
        dispatch(getTablesState());
        dispatch(getOrderState());
    },[dispatch])
    const addProductToOrder = (data: any) => {
        setOrderProducts((prevState) => {
            return [...prevState,data]
        })
    }

    const handleCategoryClick = (id: number) => {
        const category = findById(categories,id);
        if(category) {
            setBackState((prevState: BackState[]) => {
                return [...prevState,{id: category?.id,name:category?.name}]
            })
        }
        setCurrentCategory(category);
    }
    const handleCategoryBackClick = (id: number) => {
        const index = backState.findIndex(x => x.id ===id);

        setBackState(backState.slice(0,index));

        const category = findById(categories,backState[index - 1]?.id)
        setCurrentCategory(category);
    }
    const handleAddToOrderClick = () => {
        table?.Order ? dispatch(addProductsToOrder(orderProducts,table?.Order?.id)) : dispatch(createOrder({
            waiterId: table?.Order?.User.id,
            tableId: table?.id,
            orderProducts: orderProducts
        }))
    }
    function findById(data: Category[], id:number):Category | undefined {
        function iter(category:Category) {
            if (category.id === id) {
                result = category;
                return true;
            }
            return Array.isArray(category.subCategories) && category.subCategories.some(iter);
        }
        var result;
        data.some(iter);
        return result
    }
    return (
        <Grid
        container
        direction="row"
        justify="center"
        item
        xs={12}
      >
        <Grid item xs={8}>
            <Grid item xs={12} container>
                {backState.length > 0 && backState.map((back) => (<p className="back" onClick={() => handleCategoryBackClick(back.id)} >{back.name}</p>))}
            </Grid>
           <Grid item xs={12} container >
           {!currentCategory ? categories.map(category => (
                <Grid item xs={12} sm={6} md={4}>
                    <Grid item xs={12} sm={9} md={11} lg={9} className={classes.root}>
                    <p className="category" onClick={() => handleCategoryClick(category.id)}>{category.name}</p>
                    </Grid>
                </Grid>
            )) : currentCategory.subCategories?.map((cat) => 
            (
                <Grid item xs={12} sm={6} md={4}>
                    <Grid item xs={12} sm={9} md={11} lg={9} className={classes.root}>
                        <p className="category" {...currentCategory.subCategories?.length && {onClick: () => handleCategoryClick(cat.id)} }>{cat.name}</p>
                    </Grid>
                </Grid>
            ))}
           </Grid>
           <Grid item xs={12} container>
               <Typography>Items</Typography>
            {currentCategory && currentCategory.Products?.map(product => (
                <Grid item xs={12} sm={6} md={4}>
                    <Grid item xs={12} sm={9} md={11} lg={9} className={classes.root}>
                        <p className="category" onClick={() => addProductToOrder({
                        productId:product.id,
                        price:product.price,
                        name:product.name,
                        quantity:1
                    })}>
                            <span>{product.name}</span>
                            <span>{product.price}</span>
                        </p>
                    </Grid>
                </Grid>
            ))}
           </Grid>
        </Grid>
        <Grid item xs={4}>
            <div className="d-flex">
                <p className="back">{table?.name}</p>
                <p className="back">Total: {table?.Order ? table.Order.totalPayment : "0.00"}</p>
            </div>
            <p>Order</p>
            {orderProducts.map(op => (
                <div className="d-flex">
                    <p>{op.name}</p>
                    <input type="number" value={op.quantity} />
                    <p>{op.price}</p>
                    <p>X</p>
                </div>
            ))}
            <p>Current amount: {orderProducts.reduce((acc, op) => acc + (op.price * op.quantity), 0)}</p>

            <Button           
            type="submit"
            variant="contained"
            color="primary" onClick={handleAddToOrderClick}>{table?.Order ? "Add to order" : "Create order"}</Button>
        </Grid>
      </Grid>
    )
}
export default TableOrder