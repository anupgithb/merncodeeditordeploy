import compiler from 'compilex';

var options = {stats : true}; //prints stats on console 
compiler.init(options);

export const CodeCompile = async(req,res)=>{
    try {
        const {code,input,lang,inputRadio} = req.body;
        // console.log(lang);
        if(lang==='C'||lang==='C++')
        {
            if(input!=="")
            {
                // console.log("goooddd");
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}};
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.error){
                        res.status(400).json({message : data.error}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            }else{
                var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}};
                compiler.compileCPP(envData , code  , function (data) {
                    if(data.error){
                        res.status(400).json({message:data.error}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            }
        }
        else if(lang==="Java"){
            if(input!=="")
            {
                var envData = { OS : "windows" ,options:{timeout:10000}};
                compiler.compileJavaWithInput(envData , code , input , function (data) {
                    if(data.error){
                        res.status(400).json({message : error.message}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            }else{
                var envData = { OS : "windows" ,options:{timeout:10000}};
                compiler.compileJava(envData , code  , function (data) {
                    if(data.error){
                        res.status(400).json({message:data.error}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            }
        }else if(lang==="Python")
        {
            if(input!=="")
            {
                var envData = { OS : "windows" ,options:{timeout:10000}};
                compiler.compilePythonWithInput(envData , code , input , function (data) {
                    if(data.error){
                        res.status(400).json({message : error.message}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            }else{
                var envData = { OS : "windows" ,options:{timeout:10000}};
                compiler.compilePython(envData , code  , function (data) {
                    if(data.error){
                        res.status(401).json({message:data.error}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            } 
        }else if(lang==="C#")
        {
            if(input!=="")
            {
                var envData = { OS : "windows" ,options:{timeout:10000}};
                compiler.compileCSWithInput(envData , code , input , function (data) {
                    if(data.error){
                        res.status(400).json({message : error.message}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            }else{
                var envData = { OS : "windows" ,options:{timeout:10000}};
                compiler.compileCS(envData , code  , function (data) {
                    if(data.error){
                        res.status(401).json({message:data.error}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            } 
        }else if(lang==="Visual Basic"){
            if(input!=="")
            {
                var envData = { OS : "windows" ,options:{timeout:10000}};
                compiler.compileVBWithInput(envData , code , input , function (data) {
                    if(data.error){
                        res.status(400).json({message : error.message}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            }else{
                var envData = { OS : "windows" ,options:{timeout:10000}};
                compiler.compileVB(envData , code  , function (data) {
                    if(data.error){
                        res.status(401).json({message:data.error}); 
                    }
                    else{
                        res.status(200).json({message:data.output});
                    }
                });
            } 
        }
        // console.log(req.body);
        // res.status(200).json({message : req.body});
        // compiler.flush(function(){
        //     console.log('All temporary files flushed !');
        //     // Delete the temporary files.
        //     // var tempFiles = compiler.getTempFiles();
        //     // for (var i = 0; i < tempFiles.length; i++) {
        //     //     var tempFile = tempFiles[i];
        //     //     fs.unlinkSync(tempFile);
        //     // }
        // });
        // compiler.flush(function(){
        //     console.log('All temporary files flushed !'); 
        //     });
        await new Promise((resolve, reject) => {
            compiler.flush(function () {
              console.log('All temporary files flushed!');
              resolve();
            });
          });
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// export const Flush =()=>{compiler.flush(function(){
//     console.log('All temporary files flushed !'); 
//     }); }
