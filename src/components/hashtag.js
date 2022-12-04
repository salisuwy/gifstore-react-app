import Chip from "./chip";

const Hashtag = ({ tags, onDelete }) => {
  return (
    <div className="flex flex-wrap justify-start">
      {tags.map((tag) => {
        return onDelete ? (
          <Chip key={tag} text={tag} onClick={() => onDelete(tag)} />
        ) : (
          <Chip key={tag} text={tag} />
        );
      })}
    </div>
  );
};

export default Hashtag;
