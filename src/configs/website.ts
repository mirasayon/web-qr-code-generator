class WebsiteConfigsClass {
	public_domain = "universalqrcodegenerator.com" as const;
	birth_year = 2025 as const;
	name = "Free QRCode Generator" as const;
	// mail = "mail@boncafe.uz" as const;
	// devs_mail = "mail.xamarin.city@gmail.com" as const;
	normalized_name = "QRCode Generator" as const;
	public_full_domain = "https://universalqrcodegenerator.com" as const;
	cyrillic_name = "QR Генератор" as const;
	cyrillic_normalized_name = "QR Генератор" as const;
	full_domain_URL: URL = new URL(this.public_full_domain);
}
export const WebsiteConfigs = new WebsiteConfigsClass();
