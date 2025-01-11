
namespace CourierAppClient
{
    public partial class Form1 : Form
    {
        PackageService packageService;
        List<Package> packages;

        public Form1()
        {
            InitializeComponent();
            packageService = new PackageService();
            packages = new List<Package>();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void button5_Click(object sender, EventArgs e)
        {

            Form2 form2 = new Form2();
            form2.ShowDialog();


        }

        private void button1_Click(object sender, EventArgs e)
        {

            Form3 form3 = new Form3();
            form3.ShowDialog();
        }

        private void button2_Click_1(object sender, EventArgs e)
        {
            Form4 form4 = new Form4();
            form4.ShowDialog();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            Form6 form6 = new Form6();
            form6.ShowDialog();
        }

        private void Form1_Load_1(object sender, EventArgs e)
        {

        }
    }
}
