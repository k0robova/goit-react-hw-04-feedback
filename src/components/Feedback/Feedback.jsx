import React from 'react';
import { useState } from 'react';
import css from './Feedback.module.css';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';

export default function Feedback() {
  const [data, setData] = useState({ good: 0, neutral: 0, bad: 0 });
  const { good, neutral, bad } = data;

  const onHandleRating = key => {
    setData(prevState => ({
      ...prevState,
      [key]: prevState[key] + 1,
    }));
  };

  const totalFeedback = good + neutral + bad;

  const positiveFeedbackPercentage = good
    ? Math.round((good / totalFeedback) * 100)
    : 0;

  const isRenderNotification = good === 0 && neutral === 0 && bad === 0;
  const isRenderStatistics = good > 0 || neutral > 0 || bad > 0;

  return (
    <div className={css.feedback_container}>
      <Section title="Please leave your feedback:">
        <FeedbackOptions
          options={Object.keys(data)}
          onLeaveFeedback={onHandleRating}
        />
      </Section>

      {isRenderNotification && <Notification message="There is no feedback" />}

      {isRenderStatistics && (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        </Section>
      )}
    </div>
  );
}
// ! ====================================================================
// class Feedback extends React.Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   onHandleRating = key => {
//     this.setState(prevState => ({
//       [key]: prevState[key] + 1,
//     }));
//   };

//   countTotalFeedback = () => {
//     // return this.state.good + this.state.neutral + this.state.bad;
//     return Object.values(this.state).reduce((acc, value) => acc + value, 0);
//   };

//   countPositiveFeedbackPercentage = () => {
//     const totalFeedback = this.countTotalFeedback();
//     return totalFeedback > 0
//       ? Math.round((this.state.good / totalFeedback) * 100)
//       : 0;
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const isRenderNotification = good === 0 && neutral === 0 && bad === 0;
//     const isRenderStatistics = good > 0 || neutral > 0 || bad > 0;
//     return (
//       <div className={css.feedback_container}>
//         <Section title="Please leave your feedback:">
//           <FeedbackOptions
//             options={Object.keys(this.state)}
//             onLeaveFeedback={this.onHandleRating}
//           />
//         </Section>

//         {isRenderNotification && (
//           <Notification message="There is no feedback" />
//         )}

//         {isRenderStatistics && (
//           <Section title="Statistics">
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={this.countTotalFeedback()}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             />
//           </Section>
//         )}
//       </div>
//     );
//   }
// }

// export default Feedback;
