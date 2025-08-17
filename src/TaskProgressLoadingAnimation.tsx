import Lottie from 'lottie-react';
import taskProgressAnimation from './assets/TaskProgressLoadingAnimation.json';

const TaskProgressLoadingAnimation = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Lottie
        animationData={taskProgressAnimation}
        loop={true}
        style={{
          width: '150px',
          height: '150px',
          maxWidth: '80%',
          maxHeight: '80%',
        }}
      />
    </div>
  );
};

export default TaskProgressLoadingAnimation;
