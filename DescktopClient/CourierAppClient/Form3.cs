using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Packaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CourierAppClient
{
    public partial class Form3 : Form
    {
        PackageService packageService;
        List<Package> packages;
        public Form3()
        {

            InitializeComponent();
            packageService = new PackageService();
            packages = new List<Package>();
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private async void button1_Click(object sender, EventArgs e)
        {
            try
            {
                List<Courier> busyCouriers = await packageService.getBusyCouriersAsync();
                listBox1.Items.Clear();

                if (busyCouriers.Any())
                {
                    foreach (Courier c in busyCouriers)
                    {
                        listBox1.Items.Add(c.name);
                    }
                }
                else
                {
                    MessageBox.Show("Nu exista curieri ocupati.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Eroare la incarcarea curierilor ocupati: {ex.Message}");
            }

        }

        private async void button2_Click(object sender, EventArgs e)
        {
            try
            {
                var couriersWithoutPackages = await packageService.GetCouriersWithoutPendingPackagesAsync();
                listBox1.Items.Clear();
                if (couriersWithoutPackages.Any())
                {
                    foreach (var courier in couriersWithoutPackages)
                    {
                        listBox2.Items.Add($"Curier: {courier.name}");
                    }
                }
                else
                {
                    listBox2.Items.Add("Nu exista curieri fara pachete.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Eroare la încarcarea curierilor fara pachete: {ex.Message}");
            }
        }

        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
