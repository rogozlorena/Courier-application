using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net.Mail;
using System.IO;
using System.Net;


namespace CourierAppClient
{

    public partial class Form6 : Form
    {
        public Form6()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (comboBox1.SelectedItem == null)
            {
                MessageBox.Show("Please select a courier!", "Attention");
                return;
            }

            string recipientEmail = comboBox1.SelectedItem.ToString();
            string fromEmail = "lorena134a@gmail.com";
            string subject = "SlothShip Message";
            string body = textBox1.Text;

            // Validare email
            try
            {
                var mailAddress = new MailAddress(recipientEmail);
            }
            catch (FormatException)
            {
                MessageBox.Show("Invalid email address selected!", "Error");
                return;
            }

            if (string.IsNullOrWhiteSpace(body))
            {
                MessageBox.Show("The email body cannot be empty.", "Error");
                return;
            }

            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("your email", "your password"),
                    EnableSsl = true,
                    Timeout = 10000 
                };

                MailMessage mailMessage = new MailMessage(fromEmail, recipientEmail)
                {
                    Subject = subject,
                    Body = body
                };

                smtpClient.Send(mailMessage);
                MessageBox.Show("Email sent successfully!");
            }
            catch (Exception ex)
            {
                File.AppendAllText("error_log.txt", $"{DateTime.Now}: {ex.Message}{Environment.NewLine}");
                MessageBox.Show($"Error sending the message: {ex.Message}", "Error");
            }

        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void Form6_Load(object sender, EventArgs e)
        {

        }
    }
}
