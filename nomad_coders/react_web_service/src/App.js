import Button from './Button';
import styles from './App.module.css';

function App() {
  return (
    <div>
      <h1 className={styles.title}>Hello react world~</h1>
      <Button text={1} />
    </div>
  );
}

export default App;
