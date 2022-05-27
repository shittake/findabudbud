function RandomInfo (props) {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div 
      className={isActive ? 'Random Information': null} 
      onClick={toggleClass} 
    >
      <p>my text</p>
    </div>
   );
}