const { gql, default: request } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

/**
 * Used to Make Get Category API request
 * @returns {Promise<Object>}
 */
const GetCategory = async () => {
  const query = gql`
    query Categories {
  categories(first: 20) {
    id
    slug
    name
    icon {
      url
    }
  }
}
  `;
  return await request(MASTER_URL, query);
};

/**
 * Fetches businesses based on the category slug
 * @param {string} category - The category slug
 * @returns {Promise<Object>}
 */
const GetFoodsByCategory = async (category) => {
  const query = gql`
    query GetFoodsByCategory($categorySlug: String!) {
      foods(where: { categories: { slug: $categorySlug } }) {
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        description
        slug
      }
    }
  `;
  return await request(MASTER_URL, query, { categorySlug: category });
};
/**
 * Fetches business details based on the slug
 * @param {string} slug - The business slug
 * @returns {Promise<Object>}
 */
const GetBusinessDetail = async (slug) => {
  const query = gql`
    query GetBusinessDetail($slug: String!) {
      restaurant(where: { slug: $slug }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
        products {
          id
          name
          price
          description
          image {
            url
          }
        }
      }
    }
  `;
  return await request(MASTER_URL, query, { slug });
};

/**
 * Adds a product to the user's cart
 * @param {Object} data - The product data
 * @returns {Promise<Object>}
 */
const AddToCart = async (data) => {
  const mutationQuery = gql`
    mutation AddToCart($data: UserCartItemCreateInput!) {
      createUserCartItem(data: $data) {
        id
        quantity
        product {
          name
          price
        }
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery, { data });
};

/**
 * Fetches the user's cart based on the user email
 * @param {string} userEmail - The user email
 * @returns {Promise<Object>}
 */
const GetUserCart = async (userEmail) => {
  const query = gql`
    query GetUserCart($userEmail: String!) {
      userCartItems(where: { userEmail: $userEmail }) {
        id
        quantity
        product {
          id
          name
          price
          image {
            url
          }
        }
        restaurant {
          id
          name
        }
      }
    }
  `;
  return await request(MASTER_URL, query, { userEmail });
};

/**
 * Disconnects a restaurant from a user's cart item
 * @param {string} id - The cart item ID
 * @returns {Promise<Object>}
 */
const DisconnectRestroFromUserCartItem = async (id) => {
  const mutationQuery = gql`
    mutation DisconnectRestro($id: ID!) {
      updateUserCartItem(
        where: { id: $id }
        data: { restaurant: { disconnect: true } }
      ) {
        id
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery, { id });
};

/**
 * Deletes a cart item based on the ID
 * @param {string} id - The cart item ID
 * @returns {Promise<Object>}
 */
const DeleteItemFromCart = async (id) => {
  const mutationQuery = gql`
    mutation DeleteCartItem($id: ID!) {
      deleteUserCartItem(where: { id: $id }) {
        id
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery, { id });
};

/**
 * Adds a new review for a restaurant
 * @param {Object} data - The review data
 * @returns {Promise<Object>}
 */
const AddNewReview = async (data) => {
  const mutationQuery = gql`
    mutation CreateReview($data: ReviewCreateInput!) {
      createReview(data: $data) {
        id
        rating
        comment
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery, { data });
};

/**
 * Fetches the reviews for a restaurant based on the slug
 * @param {string} slug - The restaurant slug
 * @returns {Promise<Object>}
 */
const getRestaurantReviews = async (slug) => {
  const query = gql`
    query GetRestaurantReviews($slug: String!) {
      reviews(where: { restaurant: { slug: $slug } }) {
        id
        rating
        comment
        userEmail
        createdAt
      }
    }
  `;
  return await request(MASTER_URL, query, { slug });
};

/**
 * Creates a new order
 * @param {Object} data - The order data
 * @returns {Promise<Object>}
 */
const CreateNewOrder = async (data) => {
  const mutationQuery = gql`
    mutation CreateOrder($data: OrderCreateInput!) {
      createOrder(data: $data) {
        id
        orderAmount
        status
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery, { data });
};

/**
 * Updates an order to add order items
 * @param {string} id - The order ID
 * @param {Object} data - The order data
 * @returns {Promise<Object>}
 */
const UpdateOrderToAddOrderItems = async (id, data) => {
  const mutationQuery = gql`
    mutation UpdateOrder($id: ID!, $data: OrderUpdateInput!) {
      updateOrder(where: { id: $id }, data: $data) {
        id
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery, { id, data });
};

/**
 * Fetches the user's orders based on the user email
 * @param {string} userEmail - The user email
 * @returns {Promise<Object>}
 */
const GetUserOrders = async (userEmail) => {
  const query = gql`
    query GetUserOrders($userEmail: String!) {
      orders(where: { userEmail: $userEmail }) {
        id
        orderAmount
        status
        createdAt
        orderItems {
          id
          quantity
          product {
            name
            price
            image {
              url
            }
          }
        }
        restaurant {
          name
          address
        }
      }
    }
  `;
  return await request(MASTER_URL, query, { userEmail });
};



// Default export
export default {
  GetCategory,
  GetBusiness: GetFood,
  GetBusinessDetail,
  AddToCart,
  GetUserCart,
  DisconnectRestroFromUserCartItem,
  DeleteItemFromCart,
  AddNewReview,
  getRestaurantReviews,
  CreateNewOrder,
  UpdateOrderToAddOrderItems,
  GetUserOrders
};
