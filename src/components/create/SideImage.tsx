import ImageURL from './../../static/tree.png';

const SideImage = () => {
  return (
    <div className="bg-white w-4/12 flex flex-col justify-center">
      <img className="px-8 self-center w-full" src={ImageURL} />
    </div>
  );
};

export default SideImage;
