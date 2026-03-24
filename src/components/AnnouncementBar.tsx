import { useLanguage } from '@/i18n/LanguageContext';

const AnnouncementBar = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-secondary py-2.5">
      <div className="container text-center">
        <p className="text-sm font-medium text-secondary-foreground">
          {t('announcement')}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
