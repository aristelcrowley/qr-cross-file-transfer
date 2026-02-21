"use client";

import ActionCard from "./ActionCard";

export default function ActionGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 w-full max-w-lg mx-auto">
      <ActionCard
        href="/send"
        icon="📤"
        title="Send"
        description="Share files from this device to the other."
        sessionState="SENDING"
      />
      <ActionCard
        href="/receive"
        icon="📥"
        title="Receive"
        description="Download files shared from the connected device."
        sessionState="RECEIVING"
      />
    </div>
  );
}
