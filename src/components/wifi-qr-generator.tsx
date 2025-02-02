"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WifiQRGenerator() {
  const [formData, setFormData] = useState({
    brandName: "ODD",
    ssid: "",
    password: "",
    encryption: "WPA",
    containerColor: "#ffffff",
  })

  const generateWifiString = () => {
    return `WIFI:T:${formData.encryption};S:${formData.ssid};P:${formData.password};;`
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-center text-2xl font-bold">WIFI QRCODE</h1>

      {/* QR Code Display */}
      <div className="rounded-lg p-4 border mx-auto w-fit" style={{ backgroundColor: formData.containerColor }}>
        <div className="text-center mb-2">WIFI 접속</div>
        <QRCodeSVG value={generateWifiString()} size={200} bgColor="#ffffff" fgColor="#000000" />
        <div className="text-center mt-2">{formData.brandName}</div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>브랜드 이름</Label>
          <Input value={formData.brandName} onChange={(e) => setFormData({ ...formData, brandName: e.target.value })} />
        </div>

        <div className="space-y-2">
          <Label>네트워크 이름(SSID)</Label>
          <Input
            placeholder="네트워크 이름을 입력하세요"
            value={formData.ssid}
            onChange={(e) => setFormData({ ...formData, ssid: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>암호화 유형</Label>
          <Select
            value={formData.encryption}
            onValueChange={(value) => setFormData({ ...formData, encryption: value })}
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
            />
            <Input
              value={formData.containerColor}
              onChange={(e) => setFormData({ ...formData, containerColor: e.target.value })}
            />
          </div>
        </div>

        <Button className="w-full" variant="default">
          생성하기
        </Button>
      </div>
    </div>
  )
}

