"use client";
import Image from "next/image";
import { BlueButton } from "@/components/BlueButton";
import { useState, useEffect } from "react";
import { EditReservation } from "./EditOverlay";
import { deleteReservation } from "@/libs/reservation";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";

export default function BookingCard({
  reservationId,
  meetingRoomId,
  meetingRoomName,
  coworkingSpaceName,
  date,
  startTime,
  endTime,
  userId,
  reloadList,
}: {
  reservationId: string;
  meetingRoomId: string;
  meetingRoomName: string;
  coworkingSpaceName: string;
  date: string;
  startTime: string;
  endTime: string;
  userId?: string;
  reloadList: Function;
}) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState(`/img/meetingRoom/${meetingRoomId}.png`);

  // to disable scrolling
  useEffect(() => {
    if (isEditOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isEditOpen]);

  const { token } = useSelector((state: RootState) => state.auth);

  const removeFunction = async () => {
    // call DELETE api to remove this id from database
    if (token && token !== null) {
      const res = await deleteReservation(token, reservationId);
      if (res.success) {
        reloadList();
      }
    } else {
      alert("token is goneee !!!");
      return;
    }
  };

  return (
    <div className="bg-zinc-100 w-full min-h-45 h-auto pl-4 pr-4 py-6 content-start rounded-[20px] overflow-hidden">
      {userId ? (
        <div className="w-full text-center break-words">
          Booking of User ID {userId}
        </div>
      ) : (
        ""
      )}

      <div className="w-full min-h-45 h-auto  grid grid-cols-1 lg:grid-cols-6 gap-4  content-start">
        <div className="col-span-full xl:col-span-2 min-h-55 h-auto lg:h-full rounded-[20px] relative overflow-hidden">
          <Image
            src={imgSrc}
            alt="meeting room"
            quality={100}
            className="bg-black w-full h-full object-cover"
            fill={true}
            onError={() => setImgSrc("/img/meetingRoom/default.png")} // Fallback to default image
          />
        </div>

        <div className="col-span-full xl:col-span-1 grid grid-auto-rows-1 gap-4">
          <div className="flex flex-col justify-center">
            <div className="text-center justify-center text-black text-base font-bold leading-tight">
              Date
              <br />
              {date}
            </div>
          </div>

          <div className="w-full h-16 px-5 py-2 bg-white rounded-[30px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <Image
              src={"/img/timeIcon.svg"}
              width={33}
              height={0}
              alt="timeIcon"
            />
            <div className="w-20 h-6 justify-center text-black text-base font-bold leading-tight">
              {startTime}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-center justify-center text-black text-base font-bold leading-tight">
              to
            </div>
          </div>

          <div className="w-full h-16 px-5 py-2 bg-white rounded-[30px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <Image
              src={"/img/timeIcon.svg"}
              width={33}
              height={0}
              alt="timeIcon"
            />
            <div className="w-20 h-6 justify-center text-black text-base font-bold leading-tight">
              {endTime}
            </div>
          </div>
        </div>
        <div className="col-span-full xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex flex-col justify-center">
            <div className="min-w-full h-auto lg:h-full flex flex-col justify-center items-center">
              <BlueButton
                text="edit"
                clickto={() => setIsEditOpen(!isEditOpen)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-center justify-center text-black text-xl font-bold leading-snug">
              {coworkingSpaceName}
              <br />
              {meetingRoomName}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="min-w-full h-auto lg:h-full flex flex-col justify-center items-center">
              <BlueButton text="remove" clickto={removeFunction} />
            </div>
          </div>
        </div>
      </div>

      {isEditOpen ? (
        <>
          <EditReservation
            id={reservationId}
            closeOverlayWhenSubmit={() => setIsEditOpen(false)}
            reloadList={reloadList}
          />
          <button
            className="fixed inset-0 bg-black z-70 opacity-40"
            onClick={() => setIsEditOpen(false)}
          ></button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
