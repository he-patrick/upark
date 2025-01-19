import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const DefaultSurveyPage = () => {
  const surveyLink = "https://www.surveymonkey.com/r/DSWT8LT"; // Replace with your actual survey link

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: surveyLink }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default DefaultSurveyPage;






// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, Text } from 'react-native';

// const SurveyData = () => {
//   const [survey, setSurvey] = useState(null);

//   useEffect(() => {
//     const fetchSurvey = async () => {
//       const response = await fetch('https://www.surveymonkey.com/r/9P62Z5Y', {
//         method: 'GET',
//         headers: {
//           'Authorization': 'Bearer cOmUpOXfevWx560egh1njti9o2HQ7lmf8YzKQPtzr6p4S.zPBY6HdusBlUMBzW9OZH6liprk28uYvqI.F.08AMtTq6.aotLQVIVJsRHAYY6FIzvlcmJXT1CejJKQbFEc',
//         },
//       });

//       const data = await response.json();
//       setSurvey(data);
//     };

//     fetchSurvey();
//   }, []);

//   if (!survey) {
//     return <Text>Loading Survey...</Text>;
//   }

//   return (
//     <SafeAreaView>
//       <Text>{survey.title}</Text>
//       {/* Display more survey details or handle response submission */}
//     </SafeAreaView>
//   );
// };

// export default SurveyData;
