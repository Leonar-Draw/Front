import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react'; // ✅ 아이콘 추가
import arrowLeft from "@iconify-icons/mdi/arrow-left";
import arrowRight from "@iconify-icons/mdi/arrow-right";
import homeIcon from '@iconify-icons/mdi/home';
import Button from './Button';
import styles from './Step.module.css';

const Step = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNextStep = () => {
    const nextStep = parseInt(id) + 1;
    if (nextStep <= 3) {
      navigate(`/step/${nextStep}`);
    }
  };

  const handlePrevStep = () => {
    const prevStep = parseInt(id) - 1;
    if (prevStep >= 1) {
      navigate(`/step/${prevStep}`);
    }
  };

  const navigateToSubStep = (subId) => {
    navigate(`/step/${id}/${subId}`);
  };

  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Step {id}</h2>

      <div className={styles.stepButtons}>
        {Array.from({ length: 12 }, (_, i) => {
          const subId = i + 1;
          const progress = localStorage.getItem(`step-${id}-${subId}`) || 0;

          return (
            <div key={i} className={styles.stepButtonContainer}>
              <button className={styles.stepButton} onClick={() => navigateToSubStep(subId)}>
                {id}-{subId}
              </button>
              <div className={styles.progressText}>{progress}%</div>
            </div>
          );
        })}
      </div>

      {/* 이전단계 및 다음단계는 arrow로 표현 */}
      {/* 왼쪽 중앙: 이전 단계 버튼 */}
      <div className={styles.prevButtonWrapper}>
        <button className={styles.prevButton} onClick={handlePrevStep}>
          <Icon icon={arrowLeft} width="60" height="60" />
        </button>
      </div>

      {/* 왼쪽 아래: 홈 버튼 */}
      <div className={styles.homeButtonWrapper}>
        <button className={styles.homeButton} onClick={() => navigate('/Home')}>
          <Icon icon={homeIcon} width="300" height="300" />
        </button>
      </div>

      {/* 오른쪽 중앙: 다음 단계 버튼 */}
      <div className={styles.nextButtonWrapper}>
        <button className={styles.prevButton} onClick={handleNextStep}>
          <Icon icon={arrowRight} width="60" height="60" />
        </button>
      </div>

      <div className={styles.webcamContainer}>
        <img src="http://localhost:5500/live_stream" className={styles.webcamFeed} />
      </div>
    </div>
  );
};

export default Step;