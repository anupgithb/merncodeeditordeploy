import React, { useState,useEffect,useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/logo.png';
import { Box,AppBar,Toolbar,Typography,styled,TextField } from '@mui/material';
import {InputLabel,MenuItem,Select} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Button} from '@mui/material';
import Code from './Code';
import { getMe, logoutUser, sendCode } from '../services/api';
import MaximizeIcon from '@mui/icons-material/Maximize';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SplitPane from 'react-split-pane';
import SplitterLayout from 'react-splitter-layout';
// Data context
import { DataContext } from '../context/DataProvider';

//cookie
import { useCookies } from "react-cookie";


import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import {python} from '@codemirror/lang-python';
import { csharp } from '@replit/codemirror-lang-csharp';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const cookieName = "token";

const Container = styled(AppBar)`
 background: #232224;
 min-height: 25px;
 display:flex;
`
const ContainerInside = styled(Toolbar)`
padding-left: 0px;
`
const LogoName = styled(Typography)`
font-size:24px;
font-weight: 700;
border-right: 1px solid grey;
padding: 9px;
`
const LanguageSelect = styled(Select)`
background-color:white;
height:35px;
width:500px;
padding:0px 5px 0px 5px;
border-right: 1px solid grey;
margin-left:10px;
margin-Right:10px;
`
const RunButton=styled(Button)`
background:#748ffc;
color:white;
width:100px;
display:flex;
justify-content:space-between;
`
const LoginButton=styled(Button)`
background:#748ffc;
color:white;
width:100px;
display:flex;
justify-content:space-between;
margin-left:100px;
`
const SplitPaneStyled = styled(SplitPane)`
.SplitPane .horizontal {
  min-height:500px;
}
`
// lower part css

const ContainerLower=styled(Box)`
background:black;
margin-top:8px;
height:100%;
`

const LowerHeading = styled(Box)`
display:flex;
justify-content:space-between;
`

const LowerButton = styled(Button)`
padding:0px 4px 0px 4px;

border-radius:2px;

`

const TextFieldStyled = styled(TextField)`
background: #232224;
width:100%;
color:white;
& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: transparent; /* Remove active effect border */
  }
`

const OutputField= styled(Box)`
overflow: auto;
width:100%;
height:100%;
background:#232224;
color:white;
`

const codeIntial={
  code:'',
  input:'',
  lang:'C++',
  inputRadio:false
}



const Editor = () => {
    // const logo = '../assets/logo.png';
    const {accountEmail,setAccountEmail}=useContext(DataContext);
    const [codeWritten,setCodeWritten]=useState(codeIntial);
    // console.log("codeInitial value",codeIntial);
    const [writtenCode,setWrittenCode]=useState("");
    const [language,setLanguage]=useState("C++");
    const [toggle,setToggle]=useState(true);
    const [colorHeader1,setColorHeader1]=useState("#232224");
    const [colorHeader2,setColorHeader2]=useState("black");
    const [output,setOutput]=useState("");
    const [input,setInput]=useState("Enter Input Here...");
    const [filename,setFilename]=useState("main.cpp");
    // console.log(colorHeader1);
    // console.log(colorHeader2);


    const onInputChange = (e) => {
      setCodeWritten({ ...codeWritten, [e.target.name]: e.target.value });
      console.log(codeWritten);
  }

    const onInputChangeLang = (e) => {
      setLanguage(e.target.value);
  }

    const onInputChangeInput = (e) => {
      setInput(e.target.value);
  }

  const handleSubmit=async()=>{
    console.log(codeWritten);
    const userRes=await getMe();
    if(userRes.data.success===false)
    {
      toast.error(userRes.data.message);
      return;
    }
    let response = await sendCode(codeWritten);
    if(!response) return;
    setOutput(response.data.message);
    setToggle(false);
    setColorHeader1("black");
    setColorHeader2("#232224");
    toast.success("Successfully Executed");
    console.log(response);
}

const handleLogout=async()=>{
  let response = await logoutUser();
  if(!response) return;
  setAccountEmail('');
  toast.success(response.data.message);
  console.log("SuccessFully logout");
}

  const handleFilename=(lang)=>{
    switch(lang){
      case "Python":
        setFilename("script.py");
        break;
      case "C++":
        setFilename("main.cpp");
        break;
      case "Java":
        setFilename("main.java");
        break;
      case "C":
        setFilename("main.c");
        break;
      case "Visual Basic":
        setFilename("Main.vb");
        break;
      default:
        setFilename("main.cpp");;
          }
  }

  var extensions = (lang) => {
    switch (lang) {
      case "C++":
        return [cpp()];
      case "C":
        return [cpp()];
      case "Java":
        return [java()];
      case "Python":
        return [python()];
      case "C#":
        return [csharp()];
      default:
        return [javascript()];
    }
  };

    useEffect(() => {
        
        // console.log('writtenCode has changed:', writtenCode);
        
        return () => {
          
        };
      }, [writtenCode]);

      useEffect(() => {
        
        
        return () => {
        // var cor1=(toggle===true?"#232224":"black");
        // var cor2=(toggle===false?"#232224":"black");
        //   setColorHeader1(cor1);
        //   setColorHeader2(cor2);
        };
      }, [toggle]);
      useEffect(() => {
        
        console.log('output has changed:', output);
        return () => {
        // var cor1=(toggle===true?"#232224":"black");
        // var cor2=(toggle===false?"#232224":"black");
        //   setColorHeader1(cor1);
        //   setColorHeader2(cor2);
        };
      }, [output]);

      useEffect(()=>{
        const fetchData = async () => {
          const response = await getMe();
          // console.log("getMe",response);
          if(response.data.success===true){
          setAccountEmail(response.data.user.email);
          // console.log(accountEmail,"accEmail");
        }else{
          setAccountEmail('');
          // console.log(" ","accEmail");
        }
        };
    
        fetchData();
        });
        

  return (
    <Box  style={{background:"black",display:'flex',flexDirection:'column',height:'100vh'}}>
    <Container>
        <ContainerInside style={{paddingLeft:"3px"}}>
            <img src={logo} alt="" style={{width:"43px",padding:"0px",marginLeft:"3px"}}/>
            <LogoName>
                Judge0 IDE
            </LogoName>
            <InputLabel></InputLabel>
            <LanguageSelect value={codeWritten.lang} name='lang' onChange={(e) => {onInputChange(e); handleFilename(e.target.value); onInputChangeLang(e); extensions(e.target.value)}}>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="C++">C++</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="Python">python</MenuItem>
                <MenuItem value="C#">C#</MenuItem>
                <MenuItem value="Visual Basic">Visual Basic</MenuItem>
            </LanguageSelect>
            <RunButton onClick={handleSubmit}><PlayArrowIcon style={{background:'rgba(0,0,0,.05)',borderRight:'1px solid grey'}}/> Run &nbsp; &nbsp; </RunButton>
            {/* <Button><PlayArrowIcon/> Run</Button> */}
            
            {accountEmail===''?
              <Link to='/login' style={{textDecoration:'none'}}>
            <LoginButton><LoginIcon/>Login</LoginButton>
            </Link>
            :
            <LoginButton onClick={handleLogout}>Logout <LogoutIcon/></LoginButton>
            }
            
        </ContainerInside>
    </Container>
    
    <SplitPaneStyled split="horizontal" minSize={59} maxSize={502} defaultSize={502} style={{minHeight:"100px !important",position:"absolute",paddingTop:"59px"}}>
    <Box style={{marginTop:'7px',width: "100%"}}>
        <Code writtenCode={writtenCode} setWrittenCode={setWrittenCode}
              language={language} setLanguage={setLanguage}
              codeWritten={codeWritten} setCodeWritten={setCodeWritten}
              filename={filename} extensions={extensions}
        />
    </Box>
    <ContainerLower>
        <LowerHeading>
          <Box style={{display:'flex'}}>
            <Box>
                <LowerButton onClick={()=>{
                    setToggle(true);
                    setColorHeader1("#232224");
                    setColorHeader2("black");
                }} variant="contained" size="small" style={{background:`${colorHeader1}`}}>Input</LowerButton>
            </Box>
            <Box>
                <LowerButton onClick={()=>{
                    setToggle(false);
                    setColorHeader1("black");
                    setColorHeader2("#232224");
                }} variant="contained" size="small" style={{background:`${colorHeader2}`}}>Output</LowerButton>
            </Box>
            </Box>
            <Box>
            <MaximizeIcon style={{border:'1.5px solid #d7d7d9',color:'#d7d7d9',width:'12px',height:'11px',margin:'8px 5px 4px 0px'}}/>
            </Box>
        </LowerHeading>
        {
        toggle===true
        ?
        <Box style={{height:"100%"}}>
        <TextFieldStyled
            name='input'
            onChange={(e) => onInputChange(e)}
            id="outlined-multiline-static"
            multiline
            rows={20}
            defaultValue="Enter Inputs Here"
            InputProps={{
              style: { color: 'white',height:'100%' },
            }}
          />
        </Box>
        :
        <OutputField>
          {output}
        </OutputField>
        }
    </ContainerLower>
    </SplitPaneStyled>
   
    </Box>
  )
}

export default Editor;