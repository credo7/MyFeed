export interface FirebaseTimestamp {
    seconds: number;
    nanoseconds: number;
}

export interface IPost {
    profileImg: string;
    username: string;
    caption: string;
    imageURL: string;
    uid: string;
    timeStamp: FirebaseTimestamp;
  }

export interface ILike {
    mark: number;
    uid: string;
}

export interface IComment {
    caption: string;
    timeStamp: number;
    username: string;
}

export interface IStory {
    username: string;
    profileImg: string;
    imageURL: string;
}

export interface ISuggestion {
    userImg: string;
    username: string;
    bio: string;
}

export interface ISuggestedProfile {
    uid: string;
}

export interface IUser {
    uid: string;
    photoURL: string;
    username: string;
    name: string;
    bio: string;
}

export interface IProfileProps {
    user: IUser;
    posts:IPost[];
    followings: string[];
    followers: string[];
}

export interface IProfileParams {
    userId:string;
}

export interface IProfileParamsProps {
    params: IProfileParams;
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}