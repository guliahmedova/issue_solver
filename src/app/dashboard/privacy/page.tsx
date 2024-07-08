
const Privacy = () => {
    return (
        <div className="p-8">
            <h1 className="text-[#2981FF] text-2xl font-bold">Məxfilik siyasəti</h1>
            <p className="text-[#9D9D9D] mt-2 opacity-90">Tətbiq istifadə olunarkən aşağıdakı qaydalar pozulmamalıdır.</p>

            <div className="mt-3">
                <h3 className="font-medium text-xl opacity-75">Təşəbbüslərə Müraciət Et vətəndaşların dövlət xidmətlərinə sorğularını göndərən tətbiq üçün Təhlükəsizlik Qaydaları:</h3>

                <ol className="mt-10">
                    <li className="mt-2">
                        <span className="font-medium">1. Şəxsi Məlumatların Mühafizəsi:</span>
                        - Tətbiqdə daxil olarkən və müraciət göndərərkən şəxsi məlumatlarınızın (ad, ünvan, əlaqə məlumatları kimi) mühafizə olunduğundan əmin olun.
                        - Şəxsi məlumatların dəyişdirilməsi, silinməsi və ya mənimsənməsi mümkün olmamalıdır.</li>
                    <li className="mt-2">
                        <span className="font-medium">2. Rəqəmsal Təhlükəsizlik:</span>
                        - Tətbiqi işlədərkən rəqəmsal təhlükəsizlik prinsiplərinə riayət edin.
                        - Şifrələmə və istifadəçi məlumatlarının müdafiəsi üçün məsləhət görülən tədbirləri gözləyin.
                    </li>
                    <li className="mt-2">
                        <span className="font-medium">3. Yalançı Və Sayta Xəbərdarlıq:</span>
                        - Zəruri məlumatların təqdim edilməsi üçün yalnız rəsmi tətbiqləri və veb saytları istifadə edin.
                        - Şübhəli e-poçt, SMS və ya veb-linkləri açmayın və şəxsi məlumatlarınızı buna uyğun yerlərdə daxil edin.
                    </li>
                    <li className="mt-2">
                        <span className="font-medium">4. Tətbiq İstifadə Etikası:</span>
                        - Digər istifadəçilərlə münasibətlərinizdə hörmətli olun və münasibətlərini münasibətləri əsla təhqir etməyin.
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default Privacy