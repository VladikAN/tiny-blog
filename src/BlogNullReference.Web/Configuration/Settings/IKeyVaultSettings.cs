namespace BlogNullReference.Web.Configuration.Settings
{
    public interface IKeyVaultSettings
    {
        bool Enabled { get; }
        string Vault { get; }
        string ClientId { get; }
        string ClientSecret { get; }
    }
}
