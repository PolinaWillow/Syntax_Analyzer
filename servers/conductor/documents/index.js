module.exports = (resultText)=>{
    const today = new Date();
    //console.log(resultText.length)
    let outputString=""
    for(let i=0;i<resultText.length;i++){
      for(let key in resultText[i]){
         outputString+=(key+': '+resultText[i][key])
      }
      outputString+='\n'
    }
    //console.log(outputString)
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Dencrypted Text</title>     
          <style>
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica',
            color: #555;
            }
          </style>     
       </head>
       <body>
          <div class="invoice-box">
             <p>${outputString}</p>
             <p>Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</p>
          </div>
       </body>
    </html>
    `
}