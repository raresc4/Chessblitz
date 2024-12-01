namespace backend.Models
{
    public class ChessUsersDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string ChessCollectionName { get; set; } = null!;
    }
}
