import { ChangeEvent, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

import DirectCell from './DirectCell';

const chatsData = [
  {
    username: 'vitaly',
    lastMsg: "Let's go for a walk",
    timeStamp: '16:00',
    unreadMsgCount: 2,
  },
  {
    username: 'bandrw',
    lastMsg: 'Are u good man',
    timeStamp: '17:30',
    unreadMsgCount: 0,
  },
  {
    username: 'evanguy',
    lastMsg: "Wow.. it's crazy!",
    timeStamp: '16:00',
    unreadMsgCount: 7,
  },
  {
    username: 'clock',
    lastMsg: "I don't think so",
    timeStamp: '16:00',
    unreadMsgCount: 0,
  },
  {
    username: 'vitaly',
    lastMsg: "Let's go for a walk",
    timeStamp: '16:00',
    unreadMsgCount: 2,
  },
  {
    username: 'bandrw',
    lastMsg: 'Are u good man',
    timeStamp: '17:30',
    unreadMsgCount: 0,
  },
  {
    username: 'evanguy',
    lastMsg: "Wow.. it's crazy!",
    timeStamp: '16:00',
    unreadMsgCount: 7,
  },
  {
    username: 'clock',
    lastMsg: "I don't think so",
    timeStamp: '16:00',
    unreadMsgCount: 0,
  },
  {
    username: 'vitaly',
    lastMsg: "Let's go for a walk",
    timeStamp: '16:00',
    unreadMsgCount: 2,
  },
  {
    username: 'bandrw',
    lastMsg: 'Are u good man',
    timeStamp: '17:30',
    unreadMsgCount: 0,
  },
  {
    username: 'evanguy',
    lastMsg: "Wow.. it's crazy!",
    timeStamp: '16:00',
    unreadMsgCount: 7,
  },
  {
    username: 'clock',
    lastMsg: "I don't think so",
    timeStamp: '16:00',
    unreadMsgCount: 0,
  },
  {
    username: 'vitaly',
    lastMsg: "Let's go for a walk",
    timeStamp: '16:00',
    unreadMsgCount: 2,
  },
  {
    username: 'bandrw',
    lastMsg: 'Are u good man',
    timeStamp: '17:30',
    unreadMsgCount: 0,
  },
  {
    username: 'evanguy',
    lastMsg: "Wow.. it's crazy!",
    timeStamp: '16:00',
    unreadMsgCount: 7,
  },
  {
    username: 'clock',
    lastMsg: "I don't think so",
    timeStamp: '16:00',
    unreadMsgCount: 0,
  },
];

export default function DirectList() {
  const [chats, setChats] = useState(chatsData);
  const [unredMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const unreadChats = chatsData.filter((chat) => chat.unreadMsgCount > 0);

    setUnreadMessages(unreadChats.length);
  }, [chatsData]);

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredChats = chatsData.filter((chat) =>
      chat.username
        .toUpperCase()
        .startsWith(e.currentTarget.value.toUpperCase()),
    );

    e.currentTarget.value ? setChats(filteredChats) : setChats(chatsData);
  };

  return (
    <div className="mx-auto min-w-screen h-full flex flex-col rounded-[32px] py-3 pt-4 overflow-hidden">
      <p className="ml-5 font-medium text-2xl">
        Messages<span className="ml-1 text-blue-500">({unredMessages})</span>
      </p>
      <div className="px-4 w-full mx-auto relative">
        <input
          placeholder="username"
          onChange={(e) => search(e)}
          className=" text-[16px] w-full border-[1px] border-gray-50 bg-gray-200 md:bg-gray-100 mx-auto py-[8px] pl-10 rounded-[32px] my-2 outline-none text-sm h-[42px]"
        />
        <BiSearch className="absolute top-[22px] left-[35px] text-gray-400" />
      </div>
      <div className="max-h-full overflow-y-scroll scrollbar-hide">
        {chats.map((chat, index) => {
          return (
            <div key={index}>
              <DirectCell
                username={chat.username}
                lastMsg={chat.lastMsg}
                timeStamp={chat.timeStamp}
                unreadMsgCount={chat.unreadMsgCount}
              />
              {index != chats.length - 1 ? (
                <hr className="w-[90%] relative left-[5%] border-t-gray-100"></hr>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
