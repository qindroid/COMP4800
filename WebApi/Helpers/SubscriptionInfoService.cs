using System.Text.Json;

namespace Helpers.SubscriptionInfo;

public class SubscriptionInfo
{
    public int PremiumCashflowAllowance { get; set; }
    public int FreeCashflowAllowance { get; set; }
}

public static class SubscriptionInfoService
{
    private const string SUBSCRIPTION_CONFIG = "./subscriptionconfig.json";
    private static void InitSubscriptionInfo()
    {
        File.WriteAllText(SUBSCRIPTION_CONFIG, "{\"PremiumCashflowAllowance\": 0, \"FreeCashflowAllowance\": 0}");
    }
    public static void SetInfo(SubscriptionInfo info)
    {
        if (!File.Exists(SUBSCRIPTION_CONFIG))
        {
            SubscriptionInfoService.InitSubscriptionInfo();
        }

       JsonSerializer.Serialize<SubscriptionInfo>(System.IO.File.OpenWrite(SUBSCRIPTION_CONFIG), info);
    }
    public static SubscriptionInfo GetInfo()
    {
        if (!File.Exists(SUBSCRIPTION_CONFIG))
        {
            SubscriptionInfoService.InitSubscriptionInfo();
        }

        return JsonSerializer.Deserialize<SubscriptionInfo>(System.IO.File.OpenRead(SUBSCRIPTION_CONFIG));
    }
}