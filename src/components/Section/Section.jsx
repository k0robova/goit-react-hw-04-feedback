import css from './Section.module.css';

const Section = ({ title, children }) => {
  return (
    <div>
      <h2 className={css.section_title}>{title}</h2>
      {children}
    </div>
  );
};

export default Section;
