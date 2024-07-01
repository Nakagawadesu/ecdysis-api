const ConfirmationSuccessEmail = `
<!doctype html>
<html
  lang="pt-BR"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title></title>
    <meta
      content="text/html; charset=utf-8"
      http-equiv="Content-Type"
    />
    <meta
      content="width=device-width, initial-scale=1.0"
      name="viewport"
    />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .body {
        line-height: 1.5;
        margin: 0;
        padding: 32px;
        width: 100%;
        background-color: #f5f5f5;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
      }
      .table-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        border: 4px solid #000;
        background-color: #d1d9f2;
        border-collapse: collapse;
      }

      .banner {
        width: 100%;
        height: auto;
        border: 3px solid black;
      }

      .container {
        border-collapse: collapse;
        box-sizing: border-box;
        width: 100%;
        max-width: 600px;
        padding: 32px;
      }

      .indigo-container {
        background-color: #3f51b5;
        width: 100%;
        color: white;
        padding: 32px;
        border-top: 3px solid black;
        border-bottom: 3px solid black;
      }

      .message-container {
        padding: 16px;
        font-size: 14px;
        background-color: white;
        color: black;
        border: 2px solid #3f51b5;
        border-radius: 8px;
      }

      .footer {
        font-size: 10px;
      }
    </style>
  </head>
  <body class="body">
    <table class="table-container">
      <tbody>
      
        <tr>
          <td class="indigo-container">
            <table
              style="
                border-collapse: collapse;
                width: 100%;
                font-size: 14px;
              "
            >
              <tr>
                <td style="font-weight: 600; text-align: center;">Confirmação de Email Bem-sucedida</td>
              </tr>
              <tr>
                <td class="message-container">
                  <p style="padding-top: 8px; padding-bottom: 16px">
                    Parabéns! Seu email foi confirmado com sucesso. Agora você está pronto para explorar todos os recursos da plataforma Ecdysis.
                  </p>
                  <p style="padding-bottom: 16px">
                    Para começar, faça login na sua conta e inicie sua jornada com a Ecdysis. Se você tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato com nossa equipe de suporte.
                  </p>
                  
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="container footer">
            <p>
              Se você não realizou essa ação ou acredita que foi um erro, entre em contato com nossa equipe de suporte imediatamente.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
export default ConfirmationSuccessEmail;
