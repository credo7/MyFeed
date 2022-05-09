import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';

import Message from './Message';

interface ChatProps {
  username: string;
  messages: MessageI[];
}

interface MessageI {
  text: string;
  timeStamp: string;
  owner: boolean;
}

const dummy: MessageI[] = [
  {
    text: 'Hello my friend',
    timeStamp: '12:10',
    owner: false,
  },
  {
    text: "Hey! I'm glad to see you yu uio ui y ui op pi uy t r",
    timeStamp: '12:20',
    owner: true,
  },
  { text: 'What about a walk?', timeStamp: '12:22', owner: false },
  { text: "If u in, i'm ready", timeStamp: '12:23', owner: false },
];

export default function Chat({ username }: ChatProps) {
  return (
    <>
      <div className="min-h-[50px] md:hidden" />
      <div className="fixed md:relative z-10 md:rounded-tr-[32px] top-0  w-full flex flex-row h-[50px] items-center justify-between px-4 bg-white border-b-[1px] border-b-gray-100">
        <div className="flex flex-row space-x-3 items-center rounded-t-[32px]">
          <IoIosArrowBack className="h-5 w-5" />
          <img className="w-8 h-8 rounded-full" src="https://fakeimg.pl/300/" />
          <p className="">{username}</p>
        </div>
        <BsThreeDots className="h-5 w-5" />
      </div>
      <div className="flex flex-col space-y-3 py-3 md:border-l-[1px] md:border-l-gray-100 h-full overflow-y-scroll">
        {dummy.map((message: MessageI, index) => {
          return (
            <div key={index}>
              <Message
                {...message}
                isLast={
                  index < dummy.length - 1
                    ? !(message.owner == dummy[index + 1].owner)
                    : true
                }
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
