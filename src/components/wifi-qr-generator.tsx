"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WifiQRGenerator() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "name",
    ssid: process.env.NEXT_PUBLIC_DEFAULT_SSID || "",
    password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || "",
    encryption: "WPA",
    containerColor: "#ffffff",
  })

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const generateWifiString = () => {
    return `WIFI:T:${formData.encryption};S:${formData.ssid};P:${formData.password};;`
  }

  const canGenerateQR = formData.ssid.trim() !== "" && 
    (formData.encryption === "nopass" || formData.password.trim() !== "");

  return (
    <div className="relative min-h-screen w-full">
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-center text-2xl font-bold">WIFI QRCODE</h1>

        {/* QR Code Display */}
        <div className="space-y-4">
          <div className="rounded-lg p-4 border mx-auto w-fit" style={{ backgroundColor: formData.containerColor }}>
            <div className="text-center mb-2">WIFI 접속</div>
            {canGenerateQR ? (
              <QRCodeSVG value={generateWifiString()} size={200} bgColor="#ffffff" fgColor="#000000" />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-500 text-center px-4">
                  네트워크 정보를<br />입력해주세요
                </span>
              </div>
            )}
            <div className="text-center mt-2">{formData.brandName}</div>
          </div>
          
          <Button 
            variant={isEditing ? "destructive" : "outline"} 
            onClick={handleEditToggle}
            className="w-full flex items-center justify-center gap-2"
          >
            {isEditing ? "수정 완료" : "QR 코드 정보 수정하기"}
            {!isEditing && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                <path d="m15 5 4 4"/>
              </svg>
            )}
          </Button>
        </div>

        {/* Form Fields */}
        <div className={`space-y-4 ${!isEditing && 'opacity-50'}`}>
          <div className="space-y-2">
            <Label>브랜드 이름</Label>
            <Input 
              value={formData.brandName} 
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>네트워크 이름(SSID)</Label>
            <Input
              placeholder="네트워크 이름을 입력하세요"
              value={formData.ssid}
              onChange={(e) => setFormData({ ...formData, ssid: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>암호화 유형</Label>
            <Select
              value={formData.encryption}
              onValueChange={(value) => setFormData({ ...formData, encryption: value })}
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

          <div className="space-y-2">
            <Label>컨테이너 배경색</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                className="w-12 h-12 p-1"
                value={formData.containerColor}
                onChange={(e) => setFormData({ ...formData, containerColor: e.target.value })}
                disabled={!isEditing}
              />
              <Input
                value={formData.containerColor}
                onChange={(e) => setFormData({ ...formData, containerColor: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            variant="default"
            disabled={!isEditing}
          >
            생성하기
          </Button>
        </div>
      </div>
    </div>
  )
}

