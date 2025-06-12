"use client";

import { scanReceiptBack } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { Camera, Loader2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

const ScanReceipt = ({ onScanComplete }) => {
  const fileInputRef = useRef();
  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceiptBack);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error(" File size is too large (>5MB)");
      return 
    }
    await scanReceiptFn(file);
  };

  useEffect(()=>{
     if(scannedData && !scanReceiptLoading){
        onScanComplete(scannedData);
        toast.success(" Receipt scanned successfully");
     }
  },[ scannedData,scanReceiptLoading])

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        className="  h-12 px-4 bg-gradient-to-br from-[#f7d05a] via-[#D39E00] to-[#A07400] text-white font-semibold text-lg rounded-lg shadow-[0_3px_10px_rgba(180,130,0,0.3)] hover:shadow-[0_5px_20px_rgba(160,116,0,0.4)] transition-all duration-300
       cursor-pointer
      "
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera />
            <span>Scan Receipt with Ai</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ScanReceipt;
