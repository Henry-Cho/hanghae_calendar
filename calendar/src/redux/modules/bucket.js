// bucket.js
import { firestore } from "../../firebase";

const bucket_db = firestore.collection("bucket");

// Actions
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";
const FILTER = "bucket/FILTER";

// initial state

const initialState = {
  list: [],
};

// Action Creators

export const loadBucket = (bucket) => {
  // 액션을 반환해준다.
  return { type: LOAD, bucket };
};

// input 에서 버킷아이템 생성해주는 것!
export const createBucket = (schedule) => {
  return { type: CREATE, schedule };
};

// 특정 아이템의 completed 상태를 받는 것!
export const updateBucket = (bucket) => {
  return { type: UPDATE, bucket };
};

// 특정 아이템을 삭제하기
export const deleteBucket = (bucket) => {
  return { type: DELETE, bucket };
};

// 완료된 것만 load 해주기
export const filterBucket = (bucket) => {
  return { type: FILTER, bucket };
};

// Firebase 와 통신하는 함수들
export const loadBucketFB = () => {
  return function (dispatch) {
    bucket_db.get().then((docs) => {
      //console.log(bucket_db);
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

export const addBucketFB = (schedule) => {
  return function (dispatch) {
    let bucket_data = {
      title: schedule.title,
      date: schedule.date,
      time: schedule.time,
      completed: schedule.completed,
    };

    bucket_db.add(bucket_data).then((docRef) => {
      bucket_data = { ...bucket_data, id: docRef.id };
      dispatch(createBucket(bucket_data));
    });
  };
};

export const updateBucketFB = (bucket) => {
  return function (dispatch) {
    bucket_db
      .doc(bucket)
      .update({
        completed: true,
      })
      .then(() => {
        dispatch(updateBucket(bucket));
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteBucketFB = (bucket) => {
  return function (dispatch) {
    bucket_db
      .doc(bucket)
      .delete()
      .then(() => {
        dispatch(deleteBucket(bucket));
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const filterBucketFB = () => {
  return function (dispatch) {
    bucket_db.get().then((docs) => {
      //console.log(bucket_db);
      // 리덕스에 넣기 위한 친구
      let bucket_data = [];

      docs.forEach((doc) => {
        if (doc.exists) {
          bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
          //console.log(bucket_data);
        }
      });

      let completed_bucket = [];
      // Reducer 와 연결시켜준다
      bucket_data.filter((bucket) => {
        if (bucket.completed) {
          completed_bucket = [...completed_bucket, bucket];
        }
      });
      console.log(completed_bucket);
      dispatch(filterBucket(completed_bucket));
    });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "bucket/LOAD": {
      let bucket_data = [...action.bucket];

      const bucket_ids = action.bucket.map((r, idx) => {
        return r.id;
      });

      action.bucket.filter((r, idx) => {
        if (bucket_ids.indexOf(r.id) === -1) {
          bucket_data = [...bucket_data, r];
        }
      });

      return { list: bucket_data };

      // if (action.bucket.length > 0) {
      //   console.log(action.bucket);
      //   return { list: action.bucket };
      // }
      // return state;
    }

    case "bucket/CREATE": {
      //state(initial state) 안에 list 가 있는 형태
      const new_bucket_list = [...state.list, action.schedule];
      return { list: new_bucket_list };
    }

    case "bucket/UPDATE": {
      //const bucket_list = state.list.map((l, idx) => {
      const bucket_list = state.list.map((l, idx) => {
        if (l.id === action.bucket) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      console.log(bucket_list);
      return { list: bucket_list };
    }

    case "bucket/DELETE": {
      const bucket_list = state.list.filter((l, idx) => {
        if (l.id !== action.bucket) {
          return l;
        }
      });
      return { list: bucket_list };
    }
    case "bucket/FILTER": {
      let bucket_data = [...action.bucket];

      const bucket_ids = action.bucket.map((r, idx) => {
        return r.id;
      });

      action.bucket.filter((r, idx) => {
        if (bucket_ids.indexOf(r.id) === -1) {
          bucket_data = [...bucket_data, r];
        }
      });

      return { list: bucket_data };
    }

    default:
      return state;
  }
}
