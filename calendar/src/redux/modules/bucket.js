// bucket.js
import { firestore } from "../../firebase";

const bucket_db = firestore.collection("bucket");

// Actions
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";

// initial state

const initialState = {
  list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
};

// Action Creators

export const loadBucket = (bucket) => {
  // 액션을 반환해준다.
  return { type: LOAD, bucket };
};

// input 에서 버킷아이템 생성해주는 것!
export const createBucket = (inputText, date, time) => {
  return { type: CREATE, inputText, date, time };
};

// Firebase 와 통신하는 함수들
export const loadBucketFB = () => {
  return function (dispatch) {
    bucket_db.get().then((docs) => {
      // 리덕스에 넣기 위한 친구
      let bucket_data = [];

      docs.forEach((doc) => {
        if (doc.exists) {
          bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
          //console.log(bucket_data);
        }
      });
      // Reducer 와 연결시켜준다
      //console.log(bucket_data);
      dispatch(loadBucket(bucket_data));
    });
  };
};

export const addBucketFB = (inputText, date, time) => {
  return function (dispatch) {
    let bucket_data = { title: inputText, date: date, time: time };

    bucket_db.add(bucket_data).then((docRef) => {
      bucket_data = { ...bucket_data, id: docRef.id };
      console.log(bucket_data);
      dispatch(createBucket(bucket_data));
    });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "bucket/LOAD": {
      if (action.bucket.length > 0) {
        return { list: action.bucket };
      }
      return state;
    }

    case "bucket/CREATE": {
      //state(initial state) 안에 list 가 있는 형태
      const new_bucket_list = [
        ...state.list,
        action.inputText,
        action.date,
        action.time,
      ];
      return { list: new_bucket_list };
    }
    default:
      return state;
  }
}
