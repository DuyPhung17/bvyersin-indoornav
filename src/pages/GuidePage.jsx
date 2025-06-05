// src/pages/GuidePage.js
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import DestinationSelector from "../components/DestinationSelector.jsx";
import InstructionSlider from "../components/InstructionSlider.jsx";
import {
  startPointsData,
  getAvailableDestinations,
  getInstructionsForRoute,
} from "../data/routesData";
import "./GuidePage.css"; // Tạo file CSS này

const GuidePage = () => {
  const [searchParams] = useSearchParams();
  const qrStartPointId = searchParams.get("start");

  const [currentStartPoint, setCurrentStartPoint] = useState(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [areFieldsDisabled, setAreFieldsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (qrStartPointId && startPointsData[qrStartPointId]) {
      setCurrentStartPoint(startPointsData[qrStartPointId]);
      setError("");
      // Reset khi QR code thay đổi
      setSelectedDestinationId("");
      setInstructions([]);
      setAreFieldsDisabled(false);
    } else if (qrStartPointId) {
      setError(`Điểm quét QR "${qrStartPointId}" không hợp lệ.`);
      setCurrentStartPoint(null);
    } else {
      setError("Vui lòng quét mã QR để bắt đầu.");
      setCurrentStartPoint(null);
    }
  }, [qrStartPointId]);

  const availableDestinations = useMemo(() => {
    return currentStartPoint
      ? getAvailableDestinations(currentStartPoint.id)
      : [];
  }, [currentStartPoint]);

  const handleDestinationChange = (destinationId) => {
    setSelectedDestinationId(destinationId);
    if (destinationId && currentStartPoint) {
      setIsLoading(true);
      setAreFieldsDisabled(true);
      setInstructions([]); // Xóa hướng dẫn cũ

      // Giả lập tải dữ liệu
      setTimeout(() => {
        const fetchedInstructions = getInstructionsForRoute(
          currentStartPoint.id,
          destinationId
        );
        if (fetchedInstructions) {
          setInstructions(fetchedInstructions);
        } else {
          setError(
            `Không tìm thấy hướng dẫn từ "${currentStartPoint.name}" đến điểm bạn chọn.`
          );
        }
        setIsLoading(false);
      }, 500); // Độ trễ 0.5 giây
    } else {
      setInstructions([]);
      setAreFieldsDisabled(false); // Cho phép chọn lại nếu bỏ chọn
    }
  };

  const handleResetSelection = () => {
    setSelectedDestinationId("");
    setInstructions([]);
    setAreFieldsDisabled(false);
    setError("");
  };

  if (error && !currentStartPoint) {
    // Chỉ hiển thị lỗi nghiêm trọng nếu không có điểm bắt đầu
    return <div className="guide-page error-message">{error}</div>;
  }

  if (!currentStartPoint) {
    return (
      <div className="guide-page loading-message">
        Đang chờ thông tin từ mã QR...
      </div>
    );
  }

  return (
    <div className="guide-page">
      <header className="page-header">
        <h1>HƯỚNG DẪN ĐƯỜNG ĐI</h1>
        <h3>BỆNH VIỆN ĐA KHOA YERSIN NHA TRANG</h3>
      </header>

      <DestinationSelector
        startPointName={currentStartPoint.name}
        destinations={availableDestinations}
        selectedDestinationId={selectedDestinationId}
        onDestinationChange={handleDestinationChange}
        isDisabled={areFieldsDisabled}
      />

      {isLoading && (
        <div className="loading-indicator">Đang tải hướng dẫn...</div>
      )}

      {!isLoading && instructions.length > 0 && (
        <>
          <InstructionSlider
            instructions={instructions}
            destinationName={
              availableDestinations.find((d) => d.id === selectedDestinationId)
                ?.name || ""
            }
          />
          <button onClick={handleResetSelection} className="reset-button">
            Chọn Lại Điểm Đến
          </button>
        </>
      )}

      {!isLoading &&
        selectedDestinationId &&
        instructions.length === 0 &&
        !error && (
          <p className="info-message">Không có hướng dẫn cho lựa chọn này.</p>
        )}
      {error && selectedDestinationId && (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
};

export default GuidePage;
