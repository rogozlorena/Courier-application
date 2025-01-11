using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CourierAppClient
{
    internal class Package
    {
        public int id { get; set; } = 0;
        public string deliveryAddress {  get; set; } = string.Empty;
        public string createdOn { get; set; } = string.Empty;
        public Courier courier { get; set; } = new Courier();
        public bool payOnDelivery { get; set; }
        public PackageStatus status { get; set; } 
        [JsonConverter(typeof(JsonStringEnumConverter))] //PackageStatus va scoate din Json
        internal enum PackageStatus
        {
            NEW,
            PENDING,
            DELIVERED
        }
    }
}
