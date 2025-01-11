using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CourierAppClient
{
    public partial class Form4 : Form
    {
        PackageService packageService;
        List<Package> packages;
        public Form4()
        {
            InitializeComponent();
            packageService = new PackageService();
            packages = new List<Package>();
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            try
            {
                // Obține datele de la serviciu
                var managersWithPackages = await packageService.GetManagersAndDeliveredPackagesCountAsync();

                // Curăță toate controalele existente din tabel
                tableLayoutPanel1.Controls.Clear();

                // Adaugă anteturi
                tableLayoutPanel1.Controls.Add(new Label()
                {
                    Text = "Manager ID",
                    Font = new Font("Arial", 10, FontStyle.Bold),
                    TextAlign = ContentAlignment.MiddleCenter,
                    AutoSize = true
                }, 0, 0);

                tableLayoutPanel1.Controls.Add(new Label()
                {
                    Text = "Pachete Livrate",
                    Font = new Font("Arial", 10, FontStyle.Bold),
                    TextAlign = ContentAlignment.MiddleCenter,
                    AutoSize = true
                }, 1, 0);

                if (managersWithPackages.Any())
                {
                    int rowIndex = 1; // Începem de la rândul 1, deoarece rândul 0 este pentru anteturi

                    foreach (var manager in managersWithPackages)
                    {
                        // Adaugă ID-ul managerului în prima coloană
                        tableLayoutPanel1.Controls.Add(new Label()
                        {
                            Text = manager.Key.ToString(),
                            AutoSize = true,
                            TextAlign = ContentAlignment.MiddleCenter
                        }, 0, rowIndex);

                        // Adaugă numărul de pachete în a doua coloană
                        tableLayoutPanel1.Controls.Add(new Label()
                        {
                            Text = manager.Value.ToString(),
                            AutoSize = true,
                            TextAlign = ContentAlignment.MiddleCenter
                        }, 1, rowIndex);

                        rowIndex++;
                    }
                }
                else
                {
                    // Dacă nu există manageri, afișează un mesaj în tabel
                    tableLayoutPanel1.Controls.Add(new Label()
                    {
                        Text = "Nu exista manageri cu pachete livrate.",
                        AutoSize = true,
                        Dock = DockStyle.Fill,
                        TextAlign = ContentAlignment.MiddleCenter
                    }, 0, 1);

                    // Combină celulele pentru mesaj (opțional)
                    tableLayoutPanel1.SetColumnSpan(tableLayoutPanel1.Controls[0], tableLayoutPanel1.ColumnCount);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Eroare la încarcarea managerilor: {ex.Message}");
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
            Form1 form1 = new Form1();
            form1.Show();
        }

        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
