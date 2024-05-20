import win32com.client as win32
import pythoncom
import os


class Email:
    def __enter__(self) -> None:
        # Inicializar o COM para a thread atual.
        pythoncom.CoInitialize()
        
        self.__outlook = win32.Dispatch('outlook.application')
        self.__email = self.__outlook.CreateItem(0)

        script_directory = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(os.path.dirname(script_directory))
        image_path = os.path.join(project_root, 'src', 'images', 'pet_logo.png')
        
        self.__attachment = self.__email.Attachments.Add(
            image_path, 1, 0, "pet_logo.png")
        self.__cid = "image.png@myemail.com"
        self.__attachment.PropertyAccessor.SetProperty(
            "http://schemas.microsoft.com/mapi/proptag/0x3712001F"
                                                       , self.__cid)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Desinicializar o COM para a thread atual após terminar com o objeto Outlook.
        pythoncom.CoUninitialize()
    
    def send_outlook(self, email, subject, client_name, schedules, service, petname):
        self.__email.To = email 
        self.__email.Subject = subject
        
       
        formatted_date = schedules.strftime('%d/%m/%Y')
        formatted_time = schedules.strftime('%H:%M')

        outlook_style_css = """
        <style>
                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f2f2f2;
                    font-family: Arial, sans-serif;
                }

                .email-container {
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                    background-color: #ffffff;
                    text-align: center;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .email-header {
                    width: 100%; /* Assegura que o header ocupe toda a largura */
                    background-color: rgba(40, 40, 99, 0.541); /* Fundo do header */
                    text-align: left; /* Alinha o conteúdo à esquerda */
                    display: flex; /* Usa flex para alinhar a imagem */
                    justify-content: flex-start; /* Alinha a imagem à esquerda */           
                }

                .email-header img {
                    width: auto; /* Permite que a imagem mantenha sua largura original */
                    height: auto; /* Mantém a proporção da altura */
                    max-width: 200px; /* Limita a largura máxima da imagem */
                    margin: 0; /* Remove margens */
                    padding: 0; /* Remove paddings */
                    position: relative;
                    bottom: -6px;
                }

                .email-body {
                    padding: 20px;
                    text-align: left;
                    color: #333333;
                }

                .email-footer {
                    background-color: rgba(40, 40, 99, 0.541);
                    color: #3a3a3a;
                    padding: 20px;
                    font-size: 12px;
                    border-top: 1px solid #f2f2f2;
                    text-align: left;
                    font-size:14px;
                }
            </style>
        """
        outlook_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            {outlook_style_css}
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <!-- Substitua './imagens/login-icon.svg' pelo caminho correto da sua imagem local -->
                    <img src="cid:{self.__cid}" alt="Imagem do cabeçalho">
                </div>
                <div class="email-body">
                    <p style="font-size:20px;">Caro {client_name},</p>
                    <p>Esperamos que esta mensagem o(a) encontre bem. É com prazer que confirmamos seu agendamento conosco para o seu pet <b>"{petname}"</b>.</p>
                    
                    <p><b>Detalhes do Agendamento:</b></p>
                    <p><b>Data:</b> {formatted_date}</p>
                    <p><b>Hora:</b> {formatted_time}</p>
                    <p><b>Local:</b> Rua Almirante Akainu 203</p>
                    <p><b>Serviço:</b> {service}</p>
                    
                    <p>Pedimos que chegue com pelo menos <b>10 minutos</b>  de antecedência e traga os documentos ou itens necessários, conforme discutido previamente.</p>
                    <p>Caso tenha algum imprevisto e precise reagendar ou cancelar, por favor, entre em contato conosco o mais breve possível pelo telefone ou por e-mail.</p>
                    
                    <p>Agradecemos pela sua confiança e estamos ansiosos para recebê-lo(a).</p>

                </div>
                <div class="email-footer">
                    Nome da Empresa<br>
                    Endereço: Rua Almirante Akainu 203<br>
                    Telefone: (11) 97090-4214<br>
                    Email: Agendamentos_Pets@gmail.com
                </div>
            </div>
        </body>
        </html>

        """


        self.__email.HTMLBody = outlook_body
        self.__email.Send()
        
        
    def send_gmail(self, email, subject, client_name, schedules, service, petname):
        self.__email.To = email 
        self.__email.Subject = subject
        
        formatted_date = schedules.strftime('%d/%m/%Y')
        formatted_time = schedules.strftime('%H:%M')

        gmail_style_css = """
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f2f2f2;
                    font-family: Arial, sans-serif;
                }
                table {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-spacing: 0; 
                    border-collapse: collapse; 
                }
                .header-image {
                    max-width: 600px; 
                    height: auto;
                    margin: 0;
                    padding: 0;
                    text-align: left; 
                    position: relative;
                    bottom: -6px;
                }
                .email-body {
                    padding: 20px;
                    text-align: left; 
                }
                .email-footer {
                    background-color: #404063;
                    color: #ffffff;
                    padding: 20px;
                    font-size: 12px;
                    text-align: left; 
                }
                .teste {
                    background-color: #404063;
                    padding: 0;
                    margin: 0;
                }
            </style>
        """
        
        gmail_body = f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            {gmail_style_css}
            </head>
            <body>
            <table class="table" cellpadding="0" cellspacing="0">
                <tr class="teste">
                    <td>
                        <img src="cid:{self.__cid}" alt="Imagem do cabeçalho" class="header-image">
                    </td>
                </tr>
                <tr>
                    <td class="email-body">
                        <p style="font-size:20px;">Caro {client_name},</p>
                        <p>Esperamos que esta mensagem o(a) encontre bem. É com prazer que confirmamos seu agendamento conosco para o seu pet <b>"{petname}"</b>.<p>
                        <p><b>Detalhes do Agendamento:</b></p>
                        <p><b>Data:</b> {formatted_date}</p>
                        <p><b>Hora:</b> {formatted_time}</p>
                        <p><b>Local:</b> Rua Almirante Akainu 203</p>
                        <p><b>Serviço:</b> {service}</p>
                        
                        <p>Pedimos que chegue com pelo menos <b>10 minutos</b>  de antecedência e traga os documentos ou itens necessários, conforme discutido previamente.</p>
                        <p>Caso tenha algum imprevisto e precise reagendar ou cancelar, por favor, entre em contato conosco o mais breve possível pelo telefone ou por e-mail.</p>
                    
                         <p>Agradecemos pela sua confiança e estamos ansiosos para recebê-lo(a).</p>

                    </td>
                </tr>
                <tr>
                    <td class="email-footer" atyle="color: white; text-decoration: none;">
                        Nome da Empresa<br>
                        Endereço: Rua Almirante Akainu 203<br>
                        Telefone: (11) 97090-4214<br>
                        Email: Agendamentos_Pets@gmail.com
                    </td>
                </tr>
            </table>
            </body>
            </html>
        """

        self.__email.HTMLBody = gmail_body
        self.__email.Send()
        

# email = Email()
# email.send_outlook('wess2.0@outlook.com', 'Confirmação de Agendamento', 'Wesley', '2075T25:00', 'Banho e Tosa')
# email.send_gmail('wesley.alexsander@aluno.faculdadeimpacta.com.br', 'Confirmação de Agendamento', 'Wesley', '2075T25:00', 'Banho e Tosa')
