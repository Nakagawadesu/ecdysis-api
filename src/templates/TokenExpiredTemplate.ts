export const TokenExpiredTemplate = `
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação Bem-sucedida</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .container {
      text-align: center;
      background-color: #fff;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .container h1 {
      color: #3f51b5;
      margin-bottom: 24px;
    }
    .container p {
      color: #333;
      margin-bottom: 24px;
    }
    .container a {
      display: inline-block;
      padding: 12px 24px;
      color: white;
      background-color: #3f51b5;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Token Expirado</h1>
    <p>Faça o Registro de sua conta novamente</p>
  </div>
</body>
</html>
`;
