import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

interface CategoryCardProps {
  slug: string;
  en: string;
  ar: string;
  image: string;
  linkTo: string;
  index: number;
}

const CategoryCard = ({ en, ar, image, linkTo, index }: CategoryCardProps) => {
  const { lang } = useLanguage();
  const name = lang === 'ar' ? ar : en;

  return (
    <Link
      to={linkTo}
      className="group relative block overflow-hidden rounded-2xl aspect-[4/3] animate-scale-in"
      style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
