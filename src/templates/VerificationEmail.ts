const ConfirmEmail = `
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

      .send-email {
        display: block;
        text-align: center;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: #3f51b5;
        color: white;
        width: 100%;
        background-color: #f5f5f5;
        border: 4px solid black;
      }

      .anchor {
        display: inline-block;
        width: 100%;
        text-decoration: none;
        color: white;
        font-weight: 600;
        font-size: 16px;
        padding: 16px 0;
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
                <td style="font-weight: 600">Falta Apenas Um Passo</td>
              </tr>
              <tr>
                <td style="padding-top: 8px; padding-bottom: 16px">
                  Notamos que você se registrou na plataforma Ecdysis no dia {{data}} às {{horario}}. Você está quase pronto para começar a explorar os recursos transformadores do Ecdysis.
                </td>
              </tr>
              <tr>
                <td class="send-email">
                  <a
                    class="anchor"
                    href="{{clientUrl}}?token={{token}}"
                    >Confirmar Email</a
                  >
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="container footer">
            <p>
              ¹O link de confirmação de email é válido por 24 horas. Após isso, você precisará reiniciar o processo de criação de conta. Se você fizer login com o Google, a confirmação de email não é necessária.
            </p>
            <p>
              ²Se você não realizou esta ação, por favor, ignore este email.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
export default ConfirmEmail;
