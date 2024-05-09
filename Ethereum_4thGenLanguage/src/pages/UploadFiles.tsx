import { useEffect, useRef, useState } from "react";
import LargeButton from "../components/shared/LargeButton";
import Button from "../components/shared/Button";

interface UploadFilesProps {}
const UploadFiles: React.FC<UploadFilesProps> = () => {
  const buyerInputRef = useRef<HTMLInputElement>(null);
  const sellerInputRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const itemSpecsRef = useRef<HTMLInputElement>(null);

  const [buyerIdentity, setBuyerIdentity] = useState<File>();
  const [buyerIdentityHash, setBuyerIdentityHash] = useState<string>("");
  const [sellerIdentity, setSellerIdentity] = useState<File>();
  const [itemProof, setItemProof] = useState<File>();
  const [itemSpecs, setItemSpecs] = useState<File>();

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

  const [events, setEvents] = useState();

  useEffect(() => {
    testOracle();
  }, [events]);

  useEffect(() => {
    testOracle();
  }, []);

  const testOracle = async () => {
    const response = await fetch("http://localhost:3000/api/testoracle", {
      method: "GET",
    });
    const event = await response.json();
    setEvents(event);
  };

  const handleClick = (key: string) => {
    if (key === "buyer") {
      if (buyerInputRef.current) {
        buyerInputRef.current.click();
      }
    }
    if (key === "seller") {
      if (sellerInputRef.current) {
        sellerInputRef.current.click();
      }
    }
    if (key === "item") {
      if (itemRef.current) {
        itemRef.current.click();
      }
    }
    if (key === "itemSpecs") {
      if (itemSpecsRef.current) {
        itemSpecsRef.current.click();
      }
    }
  };
  const handleDelete = (key: string) => {
    if (buyerIdentityHash === "") {
      if (key === "buyer") setBuyerIdentity(undefined);
      if (key === "seller") setSellerIdentity(undefined);
      if (key === "item") setItemProof(undefined);
      if (key === "itemSpecs") setItemSpecs(undefined);
    } else {
      let link = `https://ipfs.io/ipfs/${buyerIdentityHash}`;
      window.open(link, "_blank");
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (key === "buyer") setBuyerIdentity(selectedFile);
      if (key === "seller") setSellerIdentity(selectedFile);
      if (key === "item") setItemProof(selectedFile);
      if (key === "itemSpecs") setItemSpecs(selectedFile);
    }
  };
  const uploadToIpfs = async () => {
    setUploadLoading(true);
    const formData = new FormData();
    if (buyerIdentity) formData.append("file", buyerIdentity);
    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      let hash = data.ipfsHash;
      setBuyerIdentityHash(hash);
      //http://localhost:8080/ipfs/<hash> to see it (8080 by default (ipfs daemon)) or https://ipfs.io/ipfs/<hash>
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadLoading(false);
    } finally {
      setUploadLoading(false);
    }
  };
  const verify = async () => {
    if (buyerIdentityHash) {
      try {
        setVerifyLoading(true);
        const response = await fetch("http://localhost:3000/api/verify", {
          method: "POST",
          body: JSON.stringify({ hash: buyerIdentityHash }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const status = response.json();
        console.log("response", status);
      } catch (error) {
        console.error("Error verifying image: ", error);
        setVerifyLoading(false);
      } finally {
        setVerifyLoading(false);
      }
    }
  };

  return (
    <div>
      <h1 className="py-8">Upload Files</h1>
      <div className="flex flex-col items-center gap-y-2">
        <LargeButton
          title="Upload Buyer's Identity Image"
          subTitle="Upload your passport or government social card"
          icon="upload"
          width={800}
          onClick={() => handleClick("buyer")}
        />
        <LargeButton
          title="Upload Seller's Identity Image"
          subTitle="Upload your passport or government social card"
          icon="upload"
          width={800}
          onClick={() => handleClick("seller")}
        />
        <LargeButton
          title="Upload Item"
          subTitle="Upload item proof image"
          icon="upload"
          width={800}
          onClick={() => handleClick("item")}
        />
        <LargeButton
          title="Upload Item Details Image"
          subTitle="Upload technical specification of item"
          icon="upload"
          width={800}
          onClick={() => handleClick("itemSpecs")}
        />

        <h1 className="py-8">Uploaded Files</h1>
        <div className="flex flex-col items-center gap-y-2">
          <LargeButton
            title="Buyer's Identity Image"
            width={800}
            subTitle={
              buyerIdentity ? "Hash: " + buyerIdentityHash : "Not uploaded yet"
            }
            icon={buyerIdentity?.name && buyerIdentityHash == "" ? "x" : ""}
            onClick={() => handleDelete("buyer")}
          />
          <LargeButton
            title="Seller's Identity Image"
            subTitle={sellerIdentity?.name || "Not uploaded yet"}
            width={800}
            icon={sellerIdentity?.name ? "x" : ""}
            onClick={() => handleDelete("seller")}
          />
          <LargeButton
            title="Item Image"
            subTitle={itemProof?.name || "Not uploaded yet"}
            width={800}
            icon={itemProof?.name ? "x" : ""}
            onClick={() => handleDelete("item")}
          />
          <LargeButton
            title="Item Details Image"
            subTitle={itemSpecs?.name || "Not uploaded yet"}
            width={800}
            icon={itemSpecs?.name ? "x" : ""}
            onClick={() => handleDelete("itemSpecs")}
          />
        </div>
        <div className="space-y-3">
          <Button
            light={true}
            loading={uploadLoading}
            onClick={() => uploadToIpfs()}
          >
            Upload to IPFS
          </Button>
          <Button dark={true} loading={verifyLoading} onClick={() => verify()}>
            Verify
          </Button>
        </div>

        <input
          ref={buyerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "buyer")}
        />
        <input
          ref={sellerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "seller")}
        />
        <input
          ref={itemRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "item")}
        />
        <input
          ref={itemSpecsRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "itemSpecs")}
        />
      </div>
    </div>
  );
};
export default UploadFiles;
