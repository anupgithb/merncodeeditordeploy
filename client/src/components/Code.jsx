import React, { useState,useEffect } from 'react'
import { Box,styled } from '@mui/material';
import MaximizeIcon from '@mui/icons-material/Maximize';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import {python} from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { csharp } from '@replit/codemirror-lang-csharp';


const Header = styled(Box)`
 display:flex;
 background:#060606;
 color:white;
 justify-content: space-between;
 align-item:center;
 height:30px;
`
var cod = `// Your First C++ Program

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}
`;

const Code = ({language,codeWritten,setCodeWritten,filename,extensions}) => {

  // const [language, setLanguage] = useState("cpp");

  switch(language){
    case "Python":
      cod=(`# This program prints Hello, world!

      print('Hello, world!')
      `);
      break;
    case "C++":
      cod=(`// Your First C++ Program

      #include <iostream>
      
      int main() {
          std::cout << "Hello World!";
          return 0;
      }`);
      break;
    case "Java":
      cod=(`// Your First Program

      class Main {
          public static void main(String[] args) {
              System.out.println("Hello, World!"); 
          }
      }`);
      break;
    case "C":
      cod=(`#include <stdio.h>
      int main() {
         // printf() displays the string inside quotation
         printf("Hello, World!");
         return 0;
      }
      `);
      break;
    case "Visual Basic":
      cod=(`Imports System

      Module Module1
         Sub Main()
           Console.WriteLine("Hello World!")
           Console.WriteLine("Press Enter Key to Exit.")
           Console.ReadLine()
         End Sub
      End Module`);
      break;
    default:
      cod=(`// Your First C++ Program

      #include <iostream>
      
      int main() {
          std::cout << "Hello World!";
          return 0;
      }`);
        }
 
  const onChange = React.useCallback((value, viewUpdate) => {
    setCodeWritten({ ...codeWritten, "code": value });
    // console.log(codeWritten);
  }, [codeWritten]);



  // language options for code mirror editor
  // const extensions = () => {
  //   switch (language) {
  //     case "C++":
  //       return [cpp()];
  //     case "Java":
  //       return [java()];
  //     case "Python":
  //       return [python()];
  //     case "C#":
  //       return [csharp()];
  //     default:
  //       return [javascript()];
  //   }
  // };

  return (
    <Box style={{height:"100%"}}>
        <Header>
           <Box 
            style={{
                background:'#1d1e22',
                height:'30px',
                width:'80px',
                textAlign: 'center',
                color:'white',
                borderRadius:'2px'
            }}
        >
            {filename}
            {/* main.cpp */}
        </Box> 
        <MaximizeIcon style={{border:'1px solid white',width:'15px',height:'15px',margin:'8px 5px 0px 0px'}}/>
        </Header>
        
        <Box style={{height:"calc(100% - 30px)"}}>
        <CodeMirror
          value={cod}
          height="100%"
          style={{fontSize:'14px',height:'100%'}}
          theme={vscodeDark}
          // closeBrackets="true"
          // extensions={[cpp()]}
          extensions={extensions(language)}
          onChange={onChange}
        />
        </Box>
    </Box>
  )
}

export default Code;