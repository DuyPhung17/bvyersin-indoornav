// src/data/routesData.js
export const startPointsData = {
  qr1: { id: "qr1", name: "Tầng 1 Khu Khám Bệnh" },
  qr2: { id: "qr2", name: "Sảnh Thang Máy Tầng 2" },
};

export const routesConfig = {
  qr1: {
    // Điểm quét QR 1
    destA: {
      id: "destA",
      name: "Phòng IT",
      instructions: [
        {
          text: "Tại tầng 1 Khu Khám Bệnh, đi vào thang máy. Bấm tầng 4",
          image: "/images/route1_destA_step1.jpg",
        },
        {
          text: "Lên đến tầng 4, tiếp theo rẽ phải.",
          image: "/images/route1_destA_step2.jpg",
        },
        {
          text: "Đi thẳng đến gần cuối dãy.",
          image: "/images/route1_destA_step3.jpg",
        },
        {
          text: "Phòng IT nằm ở bên tay phải của bạn.",
          image: "/images/route1_destA_step4.jpg",
        },
      ],
    },
    // destB: {
    //   id: "destB",
    //   name: "Khu Vực Canteen Y",
    //   instructions: [
    //     {
    //       text: "Từ Cổng Chính Khu A, đi thẳng qua sảnh chính.",
    //       image: "/images/route1_destB_step1.jpg",
    //     },
    //     {
    //       text: "Rẽ phải ở cuối sảnh.",
    //       image: "/images/route1_destB_step2.jpg",
    //     },
    //     {
    //       text: "Đi hết hành lang, Canteen Y nằm ở phía cuối, bên tay trái.",
    //       image: "/images/route1_destB_step3.jpg",
    //     },
    //   ],
    // },
  },
  qr2: {
    // Điểm quét QR 2
    destC: {
      id: "destC",
      name: "Phòng Kỹ Thuật Z",
      instructions: [
        {
          text: "Từ Sảnh Thang Máy Tầng 2, đi ra cửa chính của sảnh.",
          image: "/images/route2_destC_step1.jpg",
        },
        {
          text: "Rẽ phải ngay khi ra khỏi sảnh.",
          image: "/images/route2_destC_step2.jpg",
        },
        {
          text: "Đi đến cuối hành lang, Phòng Kỹ Thuật Z là cửa thứ 2 từ cuối, bên tay trái.",
          image: "/images/route2_destC_step3.jpg",
        },
      ],
    },
    destA: {
      // Điểm đến này có thể được truy cập từ nhiều điểm bắt đầu
      id: "destA",
      name: "Phòng Hội Thảo X",
      instructions: [
        {
          text: "Từ Sảnh Thang Máy Tầng 2, đi về phía tay phải.",
          image: "/images/route2_destA_step1.jpg",
        },
        {
          text: "Phòng Hội Thảo X là phòng đầu tiên bạn thấy.",
          image: "/images/route2_destA_step2.jpg",
        },
      ],
    },
  },
};

/**
 * Lấy danh sách các điểm đến có thể từ một điểm bắt đầu.
 * @param {string} startPointId ID của điểm bắt đầu.
 * @returns {Array<{id: string, name: string}>} Danh sách các điểm đến.
 */
export const getAvailableDestinations = (startPointId) => {
  if (!startPointId || !routesConfig[startPointId]) {
    return [];
  }
  return Object.values(routesConfig[startPointId]).map((dest) => ({
    id: dest.id,
    name: dest.name,
  }));
};

/**
 * Lấy hướng dẫn cho một lộ trình cụ thể.
 * @param {string} startPointId ID của điểm bắt đầu.
 * @param {string} destinationId ID của điểm đến.
 * @returns {Array<{text: string, image: string}>|null} Hướng dẫn hoặc null nếu không tìm thấy.
 */
export const getInstructionsForRoute = (startPointId, destinationId) => {
  if (
    !startPointId ||
    !destinationId ||
    !routesConfig[startPointId] ||
    !routesConfig[startPointId][destinationId]
  ) {
    return null;
  }
  return routesConfig[startPointId][destinationId].instructions;
};
