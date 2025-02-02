"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface WifiCredentials {
  brandName: string;
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  containerColor: string;
}

const formSchema = z.object({
  brandName: z.string().min(1),
  ssid: z.string().min(1),
  password: z.string().min(1),
  encryption: z.enum(["WPA", "WEP", "nopass"]),
  containerColor: z.string(),
}) satisfies z.ZodType<WifiCredentials>;

export default function WifiQRGenerator() {
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "name",
      ssid: process.env.NEXT_PUBLIC_DEFAULT_SSID || "",
      password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || "",
      encryption: "WPA",
      containerColor: "#ffffff",
    },
  })

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const generateWifiString = () => {
    return `WIFI:T:${form.watch("encryption")};S:${form.watch("ssid")};P:${form.watch("password")};;`
  }

  const canGenerateQR = form.watch("ssid").trim() !== "" && 
    (form.watch("encryption") === "nopass" || form.watch("password").trim() !== "");

  return (
    <div className="relative min-h-screen w-full">
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-center text-2xl font-bold">WIFI QRCODE</h1>

        {/* QR Code Display */}
        <div className="relative">
          <div 
            id="qr-container"
            className="rounded-lg p-4 border mx-auto w-fit" 
            style={{ backgroundColor: form.watch("containerColor") }}
          >
            <div className="text-center mb-2">WIFI 접속</div>
            {form.watch("ssid") ? (
              <QRCodeSVG value={generateWifiString()} size={200} bgColor="#ffffff" fgColor="#000000" />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-100 flex items-center justify-center text-gray-400">
                QR 코드가 여기에 표시됩니다
              </div>
            )}
            <div className="text-center mt-2">{form.watch("brandName")}</div>
          </div>
        </div>

        {/* Buttons */}
        {form.watch("ssid") && (
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => {
                // SVG를 PNG로 변환하여 다운로드
                const svgElement = document.querySelector('#qr-container svg');
                const container = document.getElementById('qr-container');
                if (!svgElement || !container) return;

                // SVG의 스타일을 포함하여 문자열로 변환
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // 이미지 생성
                const img = new Image();
                const blob = new Blob([svgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);

                img.onload = () => {
                  // 캔버스 크기 설정
                  canvas.width = container.offsetWidth;
                  canvas.height = container.offsetHeight;

                  // 배경색 그리기
                  ctx.fillStyle = form.watch("containerColor");
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  // 텍스트 그리기 (상단)
                  ctx.fillStyle = 'black';
                  ctx.font = '14px sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('WIFI 접속', canvas.width / 2, 25);

                  // QR 코드 그리기
                  ctx.drawImage(img, (canvas.width - 200) / 2, 40);

                  // 텍스트 그리기 (하단)
                  ctx.fillText(form.watch("brandName"), canvas.width / 2, canvas.height - 15);

                  // 다운로드
                  const pngUrl = canvas.toDataURL('image/png');
                  const downloadLink = document.createElement('a');
                  downloadLink.download = `${form.watch("brandName")}-wifi-qr.png`;
                  downloadLink.href = pngUrl;
                  downloadLink.click();

                  // 메모리 정리
                  URL.revokeObjectURL(url);
                };

                img.src = url;
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              QR 저장
            </Button>
            <Button
              onClick={handleEditToggle}
              variant={isEditing ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  저장하기
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                  수정하기
                </>
              )}
            </Button>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>브랜드 이름</Label>
            <Input {...form.register("brandName")} disabled={!isEditing} />
          </div>

          <div className="space-y-2">
            <Label>네트워크 이름(SSID)</Label>
            <Input
              placeholder="네트워크 이름을 입력하세요"
              {...form.register("ssid")}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...form.register("password")}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>암호화 유형</Label>
            <Select
              defaultValue={form.watch("encryption")}
              onValueChange={(value) => form.setValue("encryption", value as "WPA" | "WEP" | "nopass")}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="암호화 유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">암호화 없음</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

