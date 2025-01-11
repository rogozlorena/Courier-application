using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace CourierAppClient
{
    public partial class Form2 : Form
    {
        PackageService packageService;
        List<Package> packages;

        public Form2()
        {
            InitializeComponent();
            packageService = new PackageService();
            packages = new List<Package>();
        }

        private void Form2_Load(object sender, EventArgs e)
        {

        }


        private async void button1_Click(object sender, EventArgs e)
        {
            try
            {
                packages = await packageService.getPackagesAsync();
                listBox1.Items.Clear();

                if (packages.Any())
                {
                    foreach (var package in packages)
                    {
                        listBox1.Items.Add($"ID: {package.id}, Adresa: {package.deliveryAddress}, Status: {package.status}");
                    }
                }
                else
                {
                    listBox1.Items.Add("Nu exista pachete disponibile.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Eroare la incarcarea pachetelor: {ex.Message}");
            }
        }



        private async  void button2_Click_1(object sender, EventArgs e)
        {
            if (int.TryParse(textBox1.Text, out int packageId))
            {
                PackageService packageService = new PackageService();
                Package? package = await packageService.GetPackageByIdAsync(packageId);

                if (package != null)
                {

                    textBox2.Text = package.status.ToString();


                    if (package.courier != null && !string.IsNullOrEmpty(package.courier.name))
                    {
                        textBox3.Text = package.courier.name;
                    }
                    else
                    {
                        textBox3.Text = "N/A";
                    }
                }
                else
                {
                    MessageBox.Show("Pachetul nu a fost găsit.", "Eroare", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Introduceți un ID valid.", "Eroare", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }

        }


        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void textBox3_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
