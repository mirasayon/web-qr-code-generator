class WebsiteConfigsClass {
	public_domain = "boncafe.uz" as const;
	birth_year = 2024 as const;
	name = "Bon!" as const;
	mail = "mail@boncafe.uz" as const;
	devs_mail = "mail.xamarin.city@gmail.com" as const;
	normalized_name = "Boncafe" as const;
	public_full_domain = "https://boncafe.uz" as const;
	cyrillic_name = "Бон!" as const;
	cyrillic_normalized_name = "кофейня Бон!" as const;
	full_domain_URL: URL = new URL(this.public_full_domain);
}
export const WebsiteConfigs = new WebsiteConfigsClass();
