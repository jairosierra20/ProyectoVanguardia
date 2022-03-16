import * as React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Typography,
    Button
 } from '@material-ui/core';
 import Box from '@material-ui/core/Box';

 import { getAuth} from "firebase/auth";
 import firebase from "firebase/compat/app";
 import firebaseConfig from "../firebase-config";
 import "firebase/compat/firestore";
 import "firebase/compat/storage" 
 import { useEffect} from "react";

 
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import EthSwap from "../abis/EthSwap.json"
import Web3 from 'web3'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(11),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();







const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);




export default function Checkout(props) {

  //BLOCKCHAIN
  const loadWeb3 = async()=> {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }else{
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

  }

  const [pageState, setPageState] = React.useState();
  const [accountData, setAccountData] = React.useState();
  const [fundValidity, setFundValidity] = React.useState(false)
  const [accountBalance, setAccountBalance] = React.useState()

  const loadBlockChain = async() =>{
    const web3 = window.web3
    // Load account
    let accounts = await web3.eth.getAccounts()
    
    const networkId = await web3.eth.net.getId()
    const networkData = EthSwap.networks[networkId]
    let balance = await web3.eth.getBalance(accounts[0])
    setAccountBalance(balance)
    console.log("Hola ")
    console.log(accounts);
    if(networkData) {
      const ethswap = web3.eth.Contract(EthSwap.abi, networkData.address)
      setPageState(ethswap)
      setAccountData(accounts)
      console.log(balance)
      console.log(ethswap);
    } else {
      console.log("stackoverflow")
    }
  }
  //ENDBLOCKCHAIN


  const auth = getAuth();
  const classes = useStyles();
  const user2 = auth.currentUser;
  
  const [ListaCompra, setListaCompra] = React.useState([]);
  const [emptyList, setEmptyList] = React.useState([]);
  const [listajuegos, setListaJuegos] = React.useState([]);
  const [docID, setDocID] = React.useState()
  const [totalPrice, setTotalPrice] = React.useState();
  const [apellido, setApellido] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [dialogExit, setDialogExit] = React.useState(false);

  const getCartItems = async() =>{
      
      let obj;
      let list = [];
      const querySnapshot = await db.collection("Usuarios").get();
   
      querySnapshot.forEach((doc) => {
        obj = doc.data();
        obj.id = doc.id;
        if(user2.email === doc.data().email){
          setListaJuegos(doc.data().listajuegos)
          setListaCompra(doc.data().ListaCompra)
          list= doc.data().ListaCompra;
          setEmail(doc.data().email)
          setApellido(doc.data().apellido)
          setNombre(doc.data().nombre)
          setDocID(obj.id)
        }
      
      });
      
      //GETTING THE PRICE DATA
      let total = 0;
      let i =0;
      

      for(i; i<list.length; i++){
        let varTemp = list[i].price;
        let varConverter=varTemp.split("ETH ")

          total = total + parseFloat(varConverter[1])
        }
      
      setTotalPrice(total)
      
      
    }

    useEffect(()=>{
      getCartItems();
      loadWeb3();
      loadBlockChain();
  },[]);

  const pushData = async() =>{
    console.log(ListaCompra)
    let obj = {nombre, apellido, email, listajuegos, ListaCompra};
    db.collection("Usuarios").doc(docID).set(obj);
    console.log("PASE TODO");
  }

  function buyGame(){
    //Verify FUND
    let roundPay = Math.round(totalPrice)
    let totalPayInEther = window.web3.utils.toWei(roundPay.toString(), 'Ether')
    console.log("Account: "+typeof accountBalance)
    console.log("Payment: "+totalPayInEther)
    let converter = parseInt(totalPayInEther)
    let balanceConv = parseInt(accountBalance)
    if(balanceConv > converter){
      console.log("why am I true?")
      buyBC();
    }else{
      console.log(balanceConv)
      setFundValidity(true)
    }
    //addToLibrary();
  }

  function buyBC(){

   let nameTemp = "Bundle:";
   if(ListaCompra.length>1){
    let i = 0; 
    for(i; i<ListaCompra.length; i++){
      nameTemp = nameTemp + " "+ListaCompra[i].name;
    }
   }else{
    nameTemp = nameTemp + " "+ListaCompra[0].name;
   }
   const bundle = nameTemp;
   let locator = accountData[0];
   console.log(locator)
   let totalTemp = Math.round(totalPrice)
   const totalPayment = window.web3.utils.toWei(totalTemp.toString(), 'Ether')
   console.log(totalPayment)
   const resultData =  pageState.methods.createTransaction().send({from:locator, value:totalPayment }).then(addToLibrary())
   console.log(resultData)
   
  }

  function addToLibrary(){
    
    let listGameTemp = listajuegos;
    let listCompraTemp = ListaCompra;

    let i = 0;
    for(i; i<listCompraTemp.length; i++){
      listGameTemp.push(listCompraTemp[i])
    }
    
    console.log(listGameTemp)
    setListaJuegos(listGameTemp);
    setListaCompra(emptyList);

    setDialogExit(true);

  }

  function dialogMExit(){
    pushData();
    setDialogExit(false);
  }

  function accountInfoExport(){
    return accountData
  }

  function dialogFundExit(){
    setFundValidity(false);
  }

    
  return (
    <Box
      sx={{
        width: 1250,
        height: 250,
        marginLeft:50,
        marginTop:30,
        backgroundColor: 'black',
      }}
    >
       
    

      
    <Grid >
        <TableContainer>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table" style={{backgroundColor:'black'}}>
            <TableHead>
            <TableRow>
                <TableCell width="40"></TableCell>
                <TableCell align="left"> 
                  <WhiteTextTypography>
                    Nombre
                  </WhiteTextTypography> 
                </TableCell>
                <TableCell align="left"> 
                  <WhiteTextTypography>
                    Precio
                  </WhiteTextTypography> 
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {ListaCompra.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    <img src={row.url} alt={row.name}  width="171" height="180" />
                </TableCell>
                <TableCell align="left"> 
                  <WhiteTextTypography>
                    {row.name}
                  </WhiteTextTypography> 
                </TableCell>
                <TableCell align="left"> 
                  <WhiteTextTypography>
                    {row.price}
                  </WhiteTextTypography> 
                </TableCell>
                </TableRow>
                
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Grid container justify="flex-start">
          Cuenta Blockchain: {accountInfoExport()}
        </Grid>
        <Grid container justify="flex-end" >
        
  
                Precio total: ETH {totalPrice}
            
        </Grid>
        <Grid  container justify="flex-end" >
        <Button variant="contained"
                    
                    onClick={buyGame}
                    
                   
                    color="primary"
            
                  >
                    Comprar
                  </Button>
        </Grid>
    </Grid>
    <Dialog
                open={dialogExit}
                onClose = {dialogMExit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                  <DialogTitle id ='alert-dialog-title'>
                      {"Checkout complete"}
                  </DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Compra realizada. Verifique transferencia
                  </DialogContentText>
                  <DialogActions>
                      <Button onClick={dialogMExit} color="primary">
                          Aceptar
                      </Button>
                  </DialogActions>
                  </DialogContent>
              </Dialog>

              <Dialog
                open={fundValidity}
                onClose = {dialogFundExit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                  <DialogTitle id ='alert-dialog-title'>
                      {"Payment Denied"}
                  </DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    No tiene suficiente fondo en su cuenta
                  </DialogContentText>
                  <DialogActions>
                      <Button onClick={dialogFundExit} color="primary">
                          Aceptar
                      </Button>
                  </DialogActions>
                  </DialogContent>
              </Dialog>
    </Box>
  );
}