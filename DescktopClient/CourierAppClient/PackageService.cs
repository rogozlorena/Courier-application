using CourierAppClient;
using System.Text.Json;

internal class PackageService
{
    static HttpClient client;

    static PackageService()
    {
        client = new HttpClient
        {
            BaseAddress = new Uri("http://localhost:8081")
        };
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(
            new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task<List<Package>> getPackagesAsync()
    {
        try
        {
            List<Package> packages = new List<Package>();
            HttpResponseMessage response = await client.GetAsync("/package/get-package");
            if (response.IsSuccessStatusCode)
            {
                string resultString = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Received JSON: " + resultString); 

                packages = JsonSerializer.Deserialize<List<Package>>(resultString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? new List<Package>();
            }
            return packages;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching packages: {ex.Message}");
            return new List<Package>();
        }
    }


   
    public async Task<List<Courier>> getBusyCouriersAsync()
    {
        try
        {
            List<Package> packages = await getPackagesAsync();
            if (packages == null || !packages.Any())
            {
                return new List<Courier>();
            }

            
            return packages
                .Where(p => p.courier != null) 
                .Select(p => p.courier) 
                .DistinctBy(c => c.id) 
                .ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching busy couriers: {ex.Message}");
            return new List<Courier>();
        }
    }



    public async Task<List<Courier>> GetCouriersWithoutPendingPackagesAsync()
    {
        try
        {
            List<Courier> couriers = new List<Courier>();
            HttpResponseMessage response = await client.GetAsync("/couriers/no-pending-packages");
            if (response.IsSuccessStatusCode)
            {
                string resultString = await response.Content.ReadAsStringAsync();
                couriers = JsonSerializer.Deserialize<List<Courier>>(resultString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? new List<Courier>();
            }
            return couriers;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching couriers: {ex.Message}");
            return new List<Courier>();
        }
    }

    public async Task<Dictionary<int, long>> GetManagersAndDeliveredPackagesCountAsync()
    {
        try
        {
            Dictionary<int, long> managerPackages = new Dictionary<int, long>();
            HttpResponseMessage response = await client.GetAsync("/managers/delivered-packages-count");
            if (response.IsSuccessStatusCode)
            {
                string resultString = await response.Content.ReadAsStringAsync();
                managerPackages = JsonSerializer.Deserialize<Dictionary<int, long>>(resultString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? new Dictionary<int, long>();
            }
            return managerPackages;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching manager packages: {ex.Message}");
            return new Dictionary<int, long>();
        }
    }

    public async Task<bool> IsServerAvailableAsync()
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync("/");
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }

    public async Task<Package?> GetPackageByIdAsync(int id)
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync($"package/get-package/{id}");
            if (response.IsSuccessStatusCode)
            {
                string resultString = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<Package>(resultString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching package by ID: {ex.Message}");
            return null;
        }
    }

}
